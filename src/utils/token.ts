import jwt from "jsonwebtoken";
import config from "config";
import TokenPayload from "../utils/interfaces/token.interface";
import { UserDocument } from "../resources/user/user.interface";
import { SessionDocument } from "../resources/session/session.interface";

class TokenService {
    public static create(
        payload: TokenPayload,
        key: string,
        options?: jwt.SignOptions | undefined,
    ): string {
        const secret = Buffer.from(key, "base64").toString("ascii");

        return jwt.sign(payload, secret as jwt.Secret, {
            ...(options && options),
            algorithm: config.get<string>("jwt.algorithm") as jwt.Algorithm,
        });
    }

    public static verify(token: string, key: string): Promise<TokenPayload | jwt.VerifyErrors> {
        const secret = Buffer.from(key, "base64").toString("ascii");

        return new Promise((resolve, reject) => {
            jwt.verify(token, secret as jwt.Secret, (error, payload) => {
                if (error) {
                    return reject(error);
                }

                return resolve(payload as TokenPayload);
            });
        });

        // try {
        //     const decoded = jwt.verify(token, secret as jwt.Secret);

        //     return {
        //         valid: true,
        //         expired: false,
        //         decoded,
        //     };
        // } catch (error: any) {
        //     return {
        //         valid: false,
        //         expired: error.message === "jwt expired",
        //         decoded: null,
        //     };
        // }
    }

    public static getTokenPayload(user: UserDocument, session: SessionDocument): TokenPayload {
        return {
            user: user._id,
            session: session._id,
        };
    }
}

export default TokenService;
