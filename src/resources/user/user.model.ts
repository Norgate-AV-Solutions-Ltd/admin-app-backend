import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { UserDocument } from "@/resources/user/user.interface";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
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

userSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
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

userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(password, user.password).catch((_) => false);
};

export default mongoose.model<UserDocument>("User", userSchema);
