import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

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

userSchema.pre("save", async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    const user = this as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    const saltWorkFactor = config.get<number>("user.password.saltWorkFactor");
    const salt = await bcrypt.genSalt(saltWorkFactor);

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(password, user.password).catch((_) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
