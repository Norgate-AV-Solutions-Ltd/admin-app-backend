import { Request, Response, NextFunction } from "express";
import { logEvent } from "./logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const { name, message, stack } = err;
    const { method, url, headers } = req;

    logEvent(`[${name}]-[${method}]-[${url}]-[${headers.origin}]: ${message}`, "errors.log");
    console.log(stack);

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status).json({ message });
};
