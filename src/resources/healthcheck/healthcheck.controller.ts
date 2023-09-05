import { Request, Response, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";

class HealthcheckController implements Controller {
    public path = "/healthcheck";
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(this.path, this.getHealthcheck);
    }

    /**
     * @openapi
     *   '/api/v1/healthcheck':
     *     get:
     *       tags:
     *         - Healthcheck
     *       description: Responds if the app is up and running
     *       responses:
     *         200:
     *           description: App is up and running
     */
    private getHealthcheck(_: Request, res: Response) {
        res.send({ message: "OK" });
    }
}

export default HealthcheckController;
