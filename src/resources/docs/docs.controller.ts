import { Request, Response, Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "config";
import Controller from "@/src/utils/interfaces/controller.interface";
import logger from "@/src/utils/logger";

class DocsController implements Controller {
    public path = "/docs";
    public router = Router();
    private options: swaggerJsdoc.Options;
    private spec: object;

    constructor(options: swaggerJsdoc.Options) {
        this.options = options;
        this.spec = swaggerJsdoc(this.options);

        this.initializeMiddleware();
        this.initializeRoutes();
    }

    public onAppDidStart() {
        logger.info(
            `Documentation is available at http://localhost:${config.get<number>("port")}/api/v1${
                this.path
            }`,
        );
    }

    private initializeMiddleware() {
        this.router.use(this.path, swaggerUi.serve, swaggerUi.setup(this.spec));
    }

    private initializeRoutes() {
        this.router.get(`${this.path}.json`, this.getDocs);
    }

    private getDocs = (_: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(this.spec);
    };
}

export default DocsController;
