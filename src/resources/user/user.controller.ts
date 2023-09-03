import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import UserService from "@/resources/user/user.service";
import HttpException from "@/utils/exceptions/http.exception";
import { CreateUserInput, createUserSchema } from "@/resources/user/user.schema";
import validationMiddleware from "@/middleware/validation.middleware";

class UserController implements Controller {
    public path = "/users";
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .get(this.path, this.getUsers)
            .post(this.path, validationMiddleware(createUserSchema), this.createUser)
            .put(this.path, this.updateUser)
            .delete(this.path, this.deleteUser);
    }

    // @desc    Get all users
    // @route   GET /users
    // @access  Private/Admin
    private getUsers = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.UserService.getUsers();

            if (!users.length) {
                return next(new HttpException(404, "No users found"));
            }

            res.send(users);
        } catch (error: any) {
            return next(new HttpException(500, error.message));
        }
    };

    // @desc    Create a new user
    // @route   POST /users
    // @access  Private/Admin
    private createUser = async (
        req: Request<{}, {}, CreateUserInput>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = await this.UserService.createUser(req.body);
            res.send(user);
        } catch (error: any) {
            return next(new HttpException(400, error.message));
        }
    };

    // @desc    Update a user
    // @route   PATCH /users
    // @access  Private/Admin
    private updateUser = async (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Not implemented");

        // const { id, firstName, lastName, email, password, role, active } = req.body;

        // if (!id || !firstName || lastName == null || !email || !role || typeof active !== "boolean") {
        //     res.status(400).json({ message: "Please fill all required fields" });
        //     return;
        // }

        // const user = await User.findById(id).exec();

        // if (!user) {
        //     res.status(400).json({ message: "User not found" });
        //     return;
        // }

        // const duplicate = await findDuplicate(email);
        // if (duplicate && duplicate?._id.toString() !== id) {
        //     res.status(409).json({ message: "Email already in use" });
        //     return;
        // }

        // user.firstName = firstName;
        // user.lastName = lastName;
        // user.email = email;
        // user.role = role;
        // user.active = active;

        // if (password) {
        //     user.password = await bcrypt.hash(password, 10);
        // }

        // const result = await user.save();

        // if (!result) {
        //     res.status(400).json({ message: "Invalid user data received" });
        //     return;
        // }

        // const updatedUser = await User.findById(user._id).select("-password").lean();
        // res.status(200).json(updatedUser);
    };

    // @desc    Delete a user
    // @route   DELETE /users
    // @access  Private/Admin
    private deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Not implemented");

        // const { id } = req.body;

        // if (!id) {
        //     res.status(400).json({ message: "User ID Required" });
        //     return;
        // }

        // const user = await User.findById(id).exec();

        // if (!user) {
        //     res.status(400).json({ message: "User not found" });
        //     return;
        // }

        // const deletedUser = await user.deleteOne();

        // if (!deletedUser) {
        //     res.status(400).json({ message: "Invalid user data received" });
        //     return;
        // }

        // res.status(200).json({
        //     message: `User ${deletedUser.email} with ID ${deletedUser.id} deleted`,
        // });
    };

    private findDuplicate = async (email: string) => {
        throw new Error("Not implemented");

        // return await User.findOne({ email }).lean().exec();
    };
}

export default UserController;