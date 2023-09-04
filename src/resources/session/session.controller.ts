import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import SessionService from "@/resources/session/session.service";

class SessionController implements Controller {
    public path = "/session";
    public router = Router();
    private SessionService = new SessionService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.post(`${this.path}/login`, this.login);
        // this.router.post(`${this.path}/logout`, this.logout);
    }

    // private login = async (req: Request, res: Response, next: NextFunction) => {
    //     const loginData: LoginDto = req.body;
    //     try {
    //         const { cookie, user } = await this.SessionService.login(loginData);
    //         res.setHeader("Set-Cookie", [cookie]);
    //         res.send(user);
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    // private logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    //     const userData: User = req.user;
    //     try {
    //         const { cookie, user } = await this.SessionService.logout(userData);
    //         res.setHeader("Set-Cookie", [cookie]);
    //         res.send(user);
    //     } catch (error) {
    //         next(error);
    //     }
    // };
}
