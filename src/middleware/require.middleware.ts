import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exceptions/http.exception";

function requireUser(_: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;

    if (!user) {
        return next(new HttpException(403, "Forbidden"));
    }

    return next();
}

export default requireUser;
