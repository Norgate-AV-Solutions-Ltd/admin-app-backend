import { TypeOf, z } from "zod";

export const createSessionSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Email is required",
            })
            .nonempty(),
        password: z
            .string({
                required_error: "Password is required",
            })
            .nonempty(),
    }),
});

export type CreateSessionSchema = TypeOf<typeof createSessionSchema>["body"];
