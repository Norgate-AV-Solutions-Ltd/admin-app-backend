import swaggerJsdoc from "swagger-jsdoc";
import config from "config";
import { version } from "@/package.json";

const apiRoot = config.get<string>("api.root") || "/";
const port = config.get<number>("port");

const options: swaggerJsdoc.Options = {
    failOnErrors: true,
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Admin API Documentation",
            version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: `http://localhost:${port}${apiRoot}`,
            },
        ],
    },
    apis: ["./src/resources/**/*.ts"],
};

export default options;
