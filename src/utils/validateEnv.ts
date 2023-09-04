import { cleanEnv, str } from "envalid";

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ["development", "production"],
        }),
        DATABASE_URI: str(),
        JWT_SECRET: str(),
    });
}

export default validateEnv;
