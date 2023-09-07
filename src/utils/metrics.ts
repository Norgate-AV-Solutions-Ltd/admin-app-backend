import express, { Request, Response } from "express";
import client from "prom-client";
import { MetricsServiceOptions } from "./interfaces/metrics.interface";

export class MetricsService {
    private static readonly express = express();
    private static readonly client = client;

    private static restHistogram: client.Histogram | null = null;
    private static databaseHistogram: client.Histogram | null = null;

    public static start(options: MetricsServiceOptions): void {
        this.client.collectDefaultMetrics();

        this.express.get(`${options.apiRoot}${options.path}`, async (_: Request, res: Response) => {
            res.set("Content-Type", this.client.register.contentType);
            return res.send(await this.client.register.metrics());
        });

        this.express.listen(options.port, () => {
            options.logger?.info(
                `Metrics service running at http://localhost:${options.port}${options.apiRoot}${options.path}`,
            );
        });
    }

    public static get restResponseTime() {
        if (!this.restHistogram) {
            this.restHistogram = new this.client.Histogram({
                name: "rest_response_time_duration_seconds",
                help: "Response time of the REST endpoints in seconds",
                labelNames: ["method", "route", "status_code"],
            });
        }

        return this.restHistogram;
    }

    public static get databaseResponseTime() {
        if (!this.databaseHistogram) {
            this.databaseHistogram = new this.client.Histogram({
                name: "db_response_time_duration_seconds",
                help: "Response time of the database queries in seconds",
                labelNames: ["operation", "success"],
            });
        }

        return this.databaseHistogram;
    }
}
