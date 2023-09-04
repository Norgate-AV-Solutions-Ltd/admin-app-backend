import "dotenv/config";
import "module-alias/register";
import config from "config";
import App from "./app";
import RootController from "@/resources/root/root.controller";
import HealthcheckController from "@/resources/healthcheck/healthcheck.controller";
import UserController from "@/resources/user/user.controller";
import logger from "@/utils/logger";
import validateEnv from "@/utils/validateEnv";

validateEnv();

try {
    const app = new App(
        [new RootController(), new HealthcheckController(), new UserController()],
        config.get<number>("port"),
        logger,
    );

    app.start();
} catch (error: any) {
    logger.error(error, "Error starting application");
    process.exit(1);
}
