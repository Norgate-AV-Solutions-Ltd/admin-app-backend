import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: "User" | "Administrator";
    active: boolean;
    verified: boolean;
    deletable: boolean;
    createdAt: Date;
    updatedAt: Date;
    isPasswordMatch: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "User",
        },
        active: {
            type: Boolean,
            default: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        deletable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
