import "dotenv/config";
import "module-alias/register";
import config from "config";
import App from "./app";
import RootController from "@/resources/root/root.controller";
import HealthcheckController from "@/resources/healthcheck/healthcheck.controller";
import UserController from "@/resources/user/user.controller";
import AllController from "@/resources/all/all.controller";
import DocsController from "./resources/docs/docs.controller";
import logger from "@/utils/logger";
import validateEnv from "@/utils/validateEnv";
import swaggerOptions from "@/utils/swagger";
import { startMetricServer } from "@/utils/metrics";

validateEnv();

try {
    const app = new App({
        controllers: [
            new RootController(),
            new HealthcheckController(),
            new UserController(),
            new DocsController(swaggerOptions),
            new AllController(),
        ],
        port: config.get<number>("port"),
        apiRoot: config.get<string>("api.root"),
        logger,
    });

    app.start();

    startMetricServer();
} catch (error: any) {
    logger.error(error, "Error starting application");
    process.exit(1);
}
