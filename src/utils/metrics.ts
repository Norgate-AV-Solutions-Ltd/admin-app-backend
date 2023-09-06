import express, { Request, Response } from "express";
import client from "prom-client";
import logger from "@/utils/logger";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "Response time of the REST endpoints in seconds",
    labelNames: ["method", "route", "status_code"],
});

export const databaseResponseTimeHistogram = new client.Histogram({
    name: "db_response_time_duration_seconds",
    help: "Response time of the database queries in seconds",
    labelNames: ["operation", "success"],
});

export function startMetricServer() {
    const collectDefaultMetrics = client.collectDefaultMetrics;

    collectDefaultMetrics();

    app.get("/api/v1/metrics", async (req: Request, res: Response) => {
        res.set("Content-Type", client.register.contentType);
        return res.send(await client.register.metrics());
    });

    app.listen(9200, () => {
        logger.info(`Metrics server listening at http://localhost:9200/api/v1/metrics`);
    });
}
