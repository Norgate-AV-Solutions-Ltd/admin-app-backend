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

validateEnv();

try {
    const app = new App(
        [
            new RootController(),
            new HealthcheckController(),
            new UserController(),
            new DocsController(swaggerOptions),
            new AllController(),
        ],
        config.get<number>("port"),
        logger,
    );

    app.start();
} catch (error: any) {
    logger.error(error, "Error starting application");
    process.exit(1);
}
