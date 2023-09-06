import { Request, Response, Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import Controller from "../../utils/interfaces/controller.interface";
import { AppInfo } from "../../utils/interfaces/app.interface";
import logger from "../../utils/logger";

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

    public onAppDidStart({ url }: AppInfo) {
        logger.info(`Docs are available at ${url}${this.path}`);
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
