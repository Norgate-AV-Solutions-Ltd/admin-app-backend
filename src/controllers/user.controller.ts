import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models";

// @desc    Get all users
// @route   GET /users
// @access  Private/Admin
export const getUsers = asyncHandler(async (_, res) => {
    const users = await User.find().select("-password").lean();

    if (!users?.length) {
        res.status(400).json({ message: "No users found" });
        return;
    }

    res.json(users);
});

// @desc    Create a new user
// @route   POST /users
// @access  Private/Admin
export const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || lastName == null || !email || !password || !role) {
        res.status(400).json({ message: "Please fill all required fields" });
        return;
    }

    if (await findDuplicate(email)) {
        res.status(409).json({ message: "Email already in use" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
    });

    if (!user) {
        res.status(400).json({ message: "Invalid user data received" });
        return;
    }

    const createdUser = await User.findById(user._id).select("-password").lean();
    res.status(201).json(createdUser);
});

// @desc    Update a user
// @route   PATCH /users
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
    const { id, firstName, lastName, email, password, role, active } = req.body;

    if (!id || !firstName || lastName == null || !email || !role || typeof active !== "boolean") {
        res.status(400).json({ message: "Please fill all required fields" });
        return;
    }

    const user = await User.findById(id).exec();

    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    const duplicate = await findDuplicate(email);
    if (duplicate && duplicate?._id.toString() !== id) {
        res.status(409).json({ message: "Email already in use" });
        return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;
    user.active = active;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const result = await user.save();

    if (!result) {
        res.status(400).json({ message: "Invalid user data received" });
        return;
    }

    const updatedUser = await User.findById(user._id).select("-password").lean();
    res.status(200).json(updatedUser);
});

// @desc    Delete a user
// @route   DELETE /users
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: "User ID Required" });
        return;
    }

    const user = await User.findById(id).exec();

    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    const deletedUser = await user.deleteOne();

    if (!deletedUser) {
        res.status(400).json({ message: "Invalid user data received" });
        return;
    }

    res.status(200).json({
        message: `User ${deletedUser.email} with ID ${deletedUser.id} deleted`,
    });
});

const findDuplicate = async (email: string) => {
    return await User.findOne({ email }).lean().exec();
};
