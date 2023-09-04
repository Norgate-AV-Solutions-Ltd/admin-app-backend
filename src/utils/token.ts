import jwt from "jsonwebtoken";
import config from "config";
import { UserDocument } from "../resources/user/user.interface";
import Token from "../utils/interfaces/token.interface";

export function createToken(user: UserDocument): string {
    const secret = config.get<string>("jwt.secret");

    return jwt.sign({ id: user._id }, secret as jwt.Secret, {
        expiresIn: "1d",
    });
}

export async function verifyToken(token: string): Promise<Token | jwt.VerifyErrors> {
    const secret = config.get<string>("jwt.secret");

    return new Promise((resolve, reject) => {
        jwt.verify(token, secret as jwt.Secret, (error, payload) => {
            if (error) {
                return reject(error);
            }

            resolve(payload as Token);
        });
    });
}

export default {
    createToken,
    verifyToken,
};
