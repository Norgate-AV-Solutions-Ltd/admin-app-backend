import { cleanEnv, str } from "envalid";

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ["development", "production"],
        }),
        DATABASE_URI: str(),
    });
}

export default validateEnv;
