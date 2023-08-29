import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const errorHandler = (error: Error, req: Request, res: Response, _: NextFunction) => {
    const { name, message, stack } = error;
    const { method, url, headers } = req;

    logger.error(`${name} ${method} ${url} ${headers.origin}: ${message}`);
    logger.error(stack);

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status).json({ message });
};
