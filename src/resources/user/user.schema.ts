import { TypeOf, z } from "zod";

export const createUserSchema = z.object({
    body: z
        .object({
            name: z.string({
                required_error: "Name is required",
            }),
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

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>["body"], "passwordConfirmation">;
