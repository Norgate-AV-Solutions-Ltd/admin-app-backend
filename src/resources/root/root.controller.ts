import { Router, Request, Response } from "express";
import path from "path";
import Controller from "../../utils/interfaces/controller.interface";

class RootController implements Controller {
    public readonly path = "/";
    public readonly router = Router();

    constructor() {
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware(): void {}

    private initializeRoutes(): void {
        this.router.get(`^${this.path}$|${this.path}/index(.html)?`, this.getRoot);
    }

    private getRoot(_: Request, res: Response): Response | void {
        return res.status(200).sendFile(path.join(__dirname, "../../views/index.html"));
    }
}

export default RootController;
