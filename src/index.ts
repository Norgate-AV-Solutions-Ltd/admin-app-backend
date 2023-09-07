import "dotenv/config";
import config from "config";
import App from "./app";
import RootController from "./resources/root/root.controller";
import HealthcheckController from "./resources/healthcheck/healthcheck.controller";
import UserController from "./resources/user/user.controller";
import SessionController from "./resources/session/session.controller";
import AllController from "./resources/all/all.controller";
import DocsController from "./resources/docs/docs.controller";
import logger from "./utils/logger";
import validateEnv from "./utils/validateEnv";
import swaggerOptions from "./utils/swagger";
import { MetricsService } from "./utils/metrics";

validateEnv();

try {
    const app = new App({
        controllers: [
            new RootController(),
            new HealthcheckController(),
            new UserController(),
            new SessionController(),
            new DocsController(swaggerOptions),
            new AllController(),
        ],
        port: config.get<number>("port"),
        apiRoot: config.get<string>("api.root"),
        logger,
    });

    app.start(() => {
        MetricsService.start({
            port: config.get<number>("metrics.port"),
            apiRoot: config.get<string>("api.root"),
            path: "/metrics",
            logger,
        });
    });
} catch (error: any) {
    logger.error(error, "Error starting application");
    process.exit(1);
}
