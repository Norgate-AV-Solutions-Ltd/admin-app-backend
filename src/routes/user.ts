import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router
    .route("/")
    .get(userController.getUsers)
    .post(userController.createUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

export { router as user };
