import { Request, Response, NextFunction, Router } from "express";
import config from "config";
import Controller from "../../utils/interfaces/controller.interface";
import SessionService from "./session.service";
import UserService from "../user/user.service";
import validationMiddleware from "../../middleware/validation.middleware";
import requireUserMiddleware from "../../middleware/require.middleware";
import loginLimitMiddleware from "../../middleware/limit.middleware";
import { CreateSessionSchema, createSessionSchema } from "./session.schema";
import HttpException from "../../utils/exceptions/http.exception";
import TokenService from "../../utils/token";
import cookieOptions from "../../utils/cookie";

class SessionController implements Controller {
    public readonly path = "/sessions";
    public readonly router = Router();
    private readonly SessionService = new SessionService();
    private readonly UserService = new UserService();

    constructor() {
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware(): void {}

    private initializeRoutes(): void {
        this.router
            .route(this.path)
            .post(
                loginLimitMiddleware,
                validationMiddleware(createSessionSchema),
                this.createSession,
            )
            .delete(requireUserMiddleware, this.deleteSession);
    }

    private createSession = async (
        req: Request<{}, {}, CreateSessionSchema>,
        res: Response,
        next: NextFunction,
    ) => {
        const user = await this.UserService.validatePassword(req.body);

        if (!user) {
            return next(new HttpException(401, "Invalid email or password"));
        }

        const session = await this.SessionService.create(user._id, req.get("user-agent") || "");

        if (!session) {
            return next(new HttpException(500, "Error creating session"));
        }

        const accessToken = TokenService.create(
            TokenService.getTokenPayload(user, session),
            config.get<string>("jwt.access.key.private"),
            {
                expiresIn: config.get<string>("jwt.access.ttl"),
            },
        );

        const refreshToken = TokenService.create(
            TokenService.getTokenPayload(user, session),
            config.get<string>("jwt.refresh.key.private"),
            {
                expiresIn: config.get<string>("jwt.refresh.ttl"),
            },
        );

        res.cookie("jwt", refreshToken, cookieOptions);

        return res.send({ accessToken });
    };

    private deleteSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = res.locals.user.session;

            if (!id) {
                return next(new HttpException(404, "Session not found"));
            }

            const session = await this.SessionService.update(
                {
                    _id: id,
                },
                { valid: false },
            );

            if (!session) {
                return next(new HttpException(500, "Error deleting session"));
            }

            return res.send({
                accessToken: null,
            });
        } catch (error: any) {
            return next(new HttpException(500, error.message));
        }
    };
}

export default SessionController;
