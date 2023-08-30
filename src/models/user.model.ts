import mongoose from "mongoose";

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

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
