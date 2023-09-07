import { Request, Response, Router } from "express";
import Controller from "../../utils/interfaces/controller.interface";

class HealthcheckController implements Controller {
    public readonly path = "/healthcheck";
    public readonly router = Router();

    constructor() {
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware(): void {}

    private initializeRoutes(): void {
        this.router.get(this.path, this.getHealthcheck);
    }

    /**
     * @openapi
     *   /healthcheck:
     *     get:
     *       tags:
     *         - Healthcheck
     *       description: Responds if the app is up and running
     *       responses:
     *         200:
     *           description: App is up and running
     */
    private getHealthcheck(_: Request, res: Response): Response {
        return res.send({ message: "OK" });
    }
}

export default HealthcheckController;
