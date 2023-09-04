import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import HttpException from "@/utils/exceptions/http.exception";
import logger from "@/utils/logger";

function validationMiddleware(schema: AnyZodObject) {
    return (req: Request, _: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            return next();
        } catch (error: any) {
            return next(new HttpException(400, error.errors));
        }
    };
}

export default validationMiddleware;
