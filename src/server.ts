import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import config from "config";
import { rootRoute, userRoute } from "./routes";
import { logger, errorHandler, logEvent } from "./middleware";
import { options as corsOptions } from "./config/cors";
import connect from "./utils/db/connect";

const app = express();
const port = config.get<number>("port");

console.log(process.env.NODE_ENV);

connect();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", rootRoute);
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
    console.log("Connected to MongoDB");

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});

mongoose.connection.on("error", (err) => {
    console.log(err);

    const { no, code, syscall, hostname } = err;

    logEvent(`[${no}]-[${code}]-[${syscall}]-[${hostname}]`, "db-errors.log");
});
