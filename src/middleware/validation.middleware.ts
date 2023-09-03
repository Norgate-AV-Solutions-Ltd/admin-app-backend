import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

function validationMiddleware(schema: AnyZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            return next();
        } catch (error: any) {
            return res.status(400).send(error.errors);
        }
    };
}

export default validationMiddleware;
