import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import config from "config";
import { healthcheckRoute, rootRoute, userRoute } from "./routes";
import { errorHandler, logHandler } from "./middleware";
import { options as corsOptions } from "./config/cors";
import connect from "./utils/db/connect";
import logger from "./utils/logger";

const app = express();
const port = config.get<number>("port");

logger.info(`Running in ${process.env.NODE_ENV} mode`);

connect();

app.use(logHandler);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", rootRoute);
app.use("/healthcheck", healthcheckRoute);
app.use("/users", userRoute);

app.all("*", (req, res) => {
    res.status(404);

    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "./views/404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not found" });
    } else {
        res.type("txt").send("404 Not found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    logger.info("Connected to MongoDB");

    app.listen(port, () => {
        logger.info(`Server is running at http://localhost:${port}`);
    });
});

mongoose.connection.on("error", (err) => {
    logger.error(err, "MongoDB connection error");
});
