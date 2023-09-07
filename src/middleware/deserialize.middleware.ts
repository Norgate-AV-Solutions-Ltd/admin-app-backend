import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import TokenHelper from "../utils/token";
import HttpException from "../utils/exceptions/http.exception";
import UserModel from "../resources/user/user.model";
import TokenPayload from "../utils/interfaces/token.interface";

async function deserializeUserMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer?.startsWith("Bearer ")) {
        return next();
    }

    const accessToken = bearer.split(" ")[1]?.trim();

    if (!accessToken) {
        return next();
    }

    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
        return next();
    }

    try {
        const payload: TokenPayload | jwt.JsonWebTokenError = await TokenHelper.verify(
            accessToken,
            config.get<string>("jwt.access.key.public"),
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            throw new Error("Unauthorized");
        }

        const user = await UserModel.findById(payload.user).select("-password").lean();

        if (!user) {
            throw new Error("Unauthorized");
        }

        res.locals.user = user;

        return next();
    } catch (error: any) {
        return next(new HttpException(401, error.message));
    }
}

export default deserializeUserMiddleware;
