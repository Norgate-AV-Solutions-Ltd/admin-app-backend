import { Document } from "mongoose";

export type UserRole = "Administrator" | "User";

export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UpdateUserInput {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    newPassword?: string;
    role?: UserRole;
    active?: boolean;
}

export interface DeleteUserInput {
    id: string;
}

export interface UserDocument extends CreateUserInput, Document {
    active: boolean;
    verified: boolean;
    deletable: boolean;
    createdAt: Date;
    updatedAt: Date;
    isValidPassword: (password: string) => Promise<boolean>;
}
