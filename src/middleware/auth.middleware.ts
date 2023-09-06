import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import TokenHelper from "../utils/token";
import UserModel from "../resources/user/user.model";
import Token from "../utils/interfaces/token.interface";
import HttpException from "../utils/exceptions/http.exception";

async function authMiddleware(
    req: any,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
        return next(new HttpException(401, "Unauthorized"));
    }

    const token = bearer.split("Bearer:")[1]?.trim();

    if (!token) {
        return next(new HttpException(401, "Unauthorized"));
    }

    try {
        const payload: Token | jwt.JsonWebTokenError = await TokenHelper.verify(
            token,
            config.get<string>("jwt.access.key.public"),
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            throw new Error("Unauthorized");
        }

        const user = await UserModel.findById(payload.user).select("-password").lean();

        if (!user) {
            throw new Error("Unauthorized");
        }

        req.user = user;

        return next();
    } catch (error: any) {
        return next(new HttpException(401, error.message));
    }
}

export default authMiddleware;
