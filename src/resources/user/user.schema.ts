import { TypeOf, z } from "zod";

export const getUsersSchema = z.object({
    body: z.object({}).strict(),
});

export const createUserSchema = z.object({
    body: z
        .object({
            name: z
                .string({
                    required_error: "Name is required",
                })
                .nonempty("Name cannot be empty"),
            email: z
                .string({
                    required_error: "Email is required",
                })
                .email("Please enter a valid email"),
            password: z
                .string({
                    required_error: "Password is required",
                })
                .min(6, "Password must be at least 6 characters long"),
            passwordConfirmation: z.string({
                required_error: "Password confirmation is required",
            }),
            role: z.enum(["User", "Administrator"]).default("User"),
        })
        .refine((data) => data.password === data.passwordConfirmation, {
            message: "Passwords do not match",
            path: ["passwordConfirmation"],
        }),
});

export const updateUserSchema = z.object({
    body: z
        .object({
            id: z
                .string({
                    required_error: "Id is required",
                })
                .nonempty("Id cannot be empty"),
            name: z.string().optional(),
            email: z.string().email("Please enter a valid email").optional(),
            password: z.string().optional(),
            newPassword: z
                .string()
                .min(6, "Password must be at least 6 characters long")
                .optional(),
            newPasswordConfirmation: z.string().optional(),
            role: z.enum(["User", "Administrator"]).optional(),
            active: z.boolean().optional(),
        })
        .refine((data) => data.newPassword === data.newPasswordConfirmation, {
            message: "Passwords do not match",
            path: ["newPasswordConfirmation"],
        }),
});

export const deleteUserSchema = z.object({
    body: z
        .object({
            id: z
                .string({
                    required_error: "Id is required",
                })
                .nonempty("Id cannot be empty"),
        })
        .strict(),
});

export type GetUsersSchema = TypeOf<typeof getUsersSchema>["body"];

export type CreateUserSchema = Omit<
    TypeOf<typeof createUserSchema>["body"],
    "passwordConfirmation"
>;

export type UpdateUserSchema = Omit<
    TypeOf<typeof updateUserSchema>["body"],
    "newPasswordConfirmation"
>;

export type DeleteUserSchema = TypeOf<typeof deleteUserSchema>["body"];
