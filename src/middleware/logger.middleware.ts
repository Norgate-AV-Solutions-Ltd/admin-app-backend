import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

function loggerMiddleware(req: Request, _: Response, next: NextFunction) {
    const { method, url, headers } = req;

    logger.info(req, `${method} ${url} ${headers.origin}`);
    next();
}

export default loggerMiddleware;
