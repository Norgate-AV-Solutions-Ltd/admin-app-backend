import express, { Application } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";
import config from "config";
import errorMiddleware from "@/middleware/error.middleware";
import loggerMiddleware from "@/middleware/logger.middleware";
import Controller from "@/utils/interfaces/controller.interface";

class App {
    public express: Application;
    public port: number;
    public logger: any;

    public readonly root: string = "/api/v1";

    constructor(controllers: Controller[], port: number, logger: any) {
        this.express = express();
        this.port = port;
        this.logger = logger;

        this.logger.info(`Running in ${process.env.NODE_ENV} mode`);

        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(loggerMiddleware);
        this.express.use(
            cors({
                origin: (origin, callback) => {
                    if (!origin) {
                        return callback(null, true);
                    }

                    const origins = config.get<string[]>("cors.origins");
                    const isAllowed = origin in origins;

                    if (isAllowed) {
                        return callback(null, true);
                    }

                    return callback(new Error("Not allowed by CORS"));
                },
            }),
        );
        this.express.use(express.json());
        this.express.use(cookieParser());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(this.root, express.static(path.join(__dirname, "./public")));
    }

    private initializeControllers(controllers: Controller[]): void {
        for (const controller of controllers) {
            this.logger.info(`Registering resource: ${controller.path}`);
            this.express.use(this.root, controller.router);
        }
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private initializeDatabaseConnection(): void {
        mongoose.connect(config.get<string>("db.uri"));

        mongoose.connection.once("open", () => {
            this.logger.info("Connected to MongoDB");

            this.express.listen(this.port, () => {
                this.logger.info(`App is running at http://localhost:${this.port}${this.root}`);
            });
        });

        mongoose.connection.on("error", (err) => {
            this.logger.error(err, "MongoDB connection error");
        });
    }

    public start(): void {
        this.initializeDatabaseConnection();
    }
}

export default App;
