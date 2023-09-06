import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import TokenHelper from "../utils/token";
import HttpException from "../utils/exceptions/http.exception";
import UserModel from "../resources/user/user.model";

async function deserializeUserMiddleware(req: any, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization?.split("Bearer ")[1];

    if (!accessToken) {
        return next();
    }

    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
        return next();
    }

    try {
        const payload = await TokenHelper.verify(
            accessToken,
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

export default deserializeUserMiddleware;
