import { Model } from "mongoose";
import UserModel from "./user.model";
import { CreateUserInput, UpdateUserInput, DeleteUserInput, UserDocument } from "./user.interface";

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

    public async createUser(input: CreateUserInput) {
        try {
            const user = await this.user.create(input);
            return await this.user.findById(user._id).select("-password").lean();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async updateUser(input: UpdateUserInput) {
        try {
            const user = await this.user.findById(input.id).exec();

            if (!user) {
                throw new Error("User not found");
            }

            if (
                !input.name &&
                !input.email &&
                !input.password &&
                !input.role &&
                input.active === undefined
            ) {
                throw new Error("Nothing to update");
            }

            user.name = input.name || user.name;
            user.email = input.email || user.email;
            user.role = input.role || user.role;
            user.active = input.active !== undefined ? input.active : user.active;

            if (input.password && input.newPassword) {
                if (!(await user.isValidPassword(input.password))) {
                    throw new Error("Invalid password");
                }

                user.password = input.newPassword;
            }

            const updatedUser = await user.save();

            if (!updatedUser) {
                throw new Error("Error updating user");
            }

            return await this.user.findById(user._id).select("-password").lean();
        } catch (error: any) {
            throw new Error(error);
        }
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
