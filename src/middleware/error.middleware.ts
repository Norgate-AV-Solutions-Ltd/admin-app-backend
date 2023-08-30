import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import HttpException from "../utils/exceptions/http.exception";

function errorMiddleware(error: HttpException, req: Request, res: Response, _: NextFunction): void {
    const { name, stack } = error;
    const { method, url, headers } = req;

    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    const origin = headers.origin || "Unknown Origin";

    logger.error(`${name} ${method} ${url} ${origin}: ${message}`);
    logger.error(stack);

    res.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
