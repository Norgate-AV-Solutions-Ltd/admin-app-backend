import { Request, Response, Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import Controller from "../../utils/interfaces/controller.interface";
import { AppInfo } from "../../utils/interfaces/app.interface";
import logger from "../../utils/logger";

class DocsController implements Controller {
    public readonly path = "/docs";
    public readonly router = Router();
    private readonly options: swaggerJsdoc.Options;
    private readonly spec: object;

    constructor(options: swaggerJsdoc.Options) {
        this.options = options;
        this.spec = swaggerJsdoc(this.options);

        this.initializeMiddleware();
        this.initializeRoutes();
    }

    public onAppDidStart({ url }: AppInfo): void {
        logger.info(`Docs are available at ${url}${this.path}`);
    }

    private initializeMiddleware(): void {
        this.router.use(this.path, swaggerUi.serve, swaggerUi.setup(this.spec));
    }

    private initializeRoutes(): void {
        this.router.get(`${this.path}.json`, this.getDocs);
    }

    private getDocs(_: Request, res: Response): Response {
        res.setHeader("Content-Type", "application/json");
        return res.send(this.spec);
    }
}

export default DocsController;
