import { Model } from "mongoose";
import UserModel from "@/resources/user/user.model";
import { CreateUserInput, DeleteUserInput, UserDocument } from "@/resources/user/user.interface";

class UserService {
    private user: Model<UserDocument> = UserModel;

    public async getUsers() {
        try {
            const users = await this.user.find().select("-password").lean();

            if (!users.length) {
                throw new Error("No users found");
            }

            return users;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    // public async getUserById(id: string) {
    //     try {
    //         const user = await this.user.findById(id).select("-password").lean();

    //         if (!user) {
    //             throw new Error("User not found");
    //         }

    //         return user;
    //     } catch (error: any) {
    //         throw new Error(error);
    //     }
    // }

    public async createUser(input: CreateUserInput) {
        try {
            const user = await this.user.create(input);
            return await this.user.findById(user._id).select("-password").lean();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async updateUser(input: any) {
        throw new Error("Not implemented");
    }

    public async deleteUser(input: DeleteUserInput) {
        try {
            const user = await this.user.findById(input.id).exec();

            if (!user) {
                throw new Error("User not found");
            }

            if (!user.deletable) {
                throw new Error("This user cannot be deleted");
            }

            const deletedUser = await user.deleteOne();

            if (!deletedUser) {
                throw new Error("Error deleting user");
            }

            return deletedUser;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default UserService;
