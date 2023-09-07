import path from "path";
import { Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";

class AllController implements Controller {
    public readonly path = "*";
    public readonly router = Router();

    constructor() {
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware(): void {}

    private initializeRoutes(): void {
        this.router.route(this.path).all(this.getAll);
    }

    private getAll(req: Request, res: Response): Response | void {
        res.status(404);

        if (req.accepts("html")) {
            return res.sendFile(path.join(__dirname, "../../views/404.html"));
        }

        if (req.accepts("json")) {
            return res.send({ message: "404 Not found" });
        }

        return res.type("txt").send("404 Not found");
    }
}

export default AllController;
