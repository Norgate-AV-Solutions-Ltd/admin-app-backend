import { cleanEnv, str, makeValidator } from "envalid";

const nonEmptyStr = makeValidator<string>((str: string) => {
    if (str.length === 0) {
        throw new Error("Cannot be an empty string");
    }

    return str;
});

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ["development", "production", "test"],
        }),
        DATABASE_URI: nonEmptyStr(),
        JWT_ACCESS_PRIVATE_KEY: nonEmptyStr(),
        JWT_ACCESS_PUBLIC_KEY: nonEmptyStr(),
        JWT_REFRESH_PRIVATE_KEY: nonEmptyStr(),
        JWT_REFRESH_PUBLIC_KEY: nonEmptyStr(),
    });
}

export default validateEnv;
