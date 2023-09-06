import { Router, Request, Response } from "express";
import path from "path";
import Controller from "../../utils/interfaces/controller.interface";

class RootController implements Controller {
    public path = "/";
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(`^${this.path}$|${this.path}/index(.html)?`, this.getRoot);
    }

    private getRoot(_: Request, res: Response) {
        res.status(200).sendFile(path.join(__dirname, "../../views/index.html"));
    }
}

export default RootController;
