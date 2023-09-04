import mongoose from "mongoose";
import { SessionDocument } from "./session.interface";

const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        valid: {
            type: Boolean,
            default: true,
        },
        userAgent: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<SessionDocument>("Session", sessionSchema);
