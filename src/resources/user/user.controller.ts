import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import UserService from "./user.service";
import HttpException from "../../utils/exceptions/http.exception";
import {
    GetUsersSchema,
    getUsersSchema,
    CreateUserSchema,
    createUserSchema,
    UpdateUserSchema,
    updateUserSchema,
    DeleteUserSchema,
    deleteUserSchema,
} from "./user.schema";
import validationMiddleware from "../../middleware/validation.middleware";

class UserController implements Controller {
    public path = "/users";
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router
            .route(this.path)
            .get(validationMiddleware(getUsersSchema), this.getUsers)
            .post(validationMiddleware(createUserSchema), this.createUser)
            .patch(validationMiddleware(updateUserSchema), this.updateUser)
            .delete(validationMiddleware(deleteUserSchema), this.deleteUser);
    }

    // @desc    Get all users
    // @route   GET /users
    // @access  Private/Admin
    private getUsers = async (
        _: Request<{}, {}, GetUsersSchema>,
        res: Response,
        next: NextFunction,
    ) => {
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
        req: Request<{}, {}, CreateUserSchema>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = await this.UserService.createUser(req.body);
            return res.send(user);
        } catch (error: any) {
            return next(new HttpException(400, error.message));
        }
    };

    // @desc    Update a user
    // @route   PATCH /users
    // @access  Private/Admin
    private updateUser = async (
        req: Request<{}, {}, UpdateUserSchema>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const user = await this.UserService.updateUser(req.body);
            return res.send(user);
        } catch (error: any) {
            return next(new HttpException(400, error.message));
        }
    };

    // @desc    Delete a user
    // @route   DELETE /users
    // @access  Private/Admin
    private deleteUser = async (
        req: Request<{}, {}, DeleteUserSchema>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const deletedUser = await this.UserService.deleteUser(req.body);

            return res.send({
                message: `User ${deletedUser.email} with ID ${deletedUser.id} deleted`,
            });
        } catch (error: any) {
            return next(new HttpException(500, error.message));
        }
    };
}

export default UserController;
