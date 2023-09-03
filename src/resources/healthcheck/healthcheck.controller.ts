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

    // @desc    Get healthcheck
    // @route   GET /healthcheck
    // @access  Private/Admin
    private getHealthcheck(_: Request, res: Response) {
        res.status(200).send({ message: "OK" });
    }
}

export default HealthcheckController;
