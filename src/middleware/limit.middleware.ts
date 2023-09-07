import { Request, Response, NextFunction } from "express";
import rateLimit, { Options } from "express-rate-limit";
import logger from "../utils/logger";
import HttpException from "../utils/exceptions/http.exception";

export const loginLimitMiddleware = rateLimit({
    windowMs: 1000 * 60,
    max: 5,
    message: "Too many login attempts from this IP, please try again after 60 seconds",
    handler: (req: Request, _: Response, next: NextFunction, options: Options) => {
        logger.error(
            `Too many requests: ${options.message.message} : ${req.ip} : ${req.method} ${req.url}`,
        );
        return next(new HttpException(options.statusCode, options.message));
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default loginLimitMiddleware;
