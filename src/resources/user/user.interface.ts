import { Document } from "mongoose";

export type UserRole = "Administrator" | "User";

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UpdateUserInput extends CreateUserInput {}

export interface UserDocument extends CreateUserInput, Document {
    active: boolean;
    verified: boolean;
    deletable: boolean;
    createdAt: Date;
    updatedAt: Date;
    isValidPassword: (password: string) => Promise<boolean>;
}
