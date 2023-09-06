import { Schema } from "mongoose";

interface TokenPayload extends Object {
    user: Schema.Types.ObjectId;
    session: Schema.Types.ObjectId;
    expiresIn?: number | undefined;
}

export default TokenPayload;
