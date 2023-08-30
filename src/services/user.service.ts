import { Document } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(user: Document<UserDocument>) {
    try {
        return await UserModel.create(user);
    } catch (error: any) {
        throw new Error(error);
    }
}
