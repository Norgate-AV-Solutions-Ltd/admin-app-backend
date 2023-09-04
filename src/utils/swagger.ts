import swaggerJsdoc from "swagger-jsdoc";
import { version } from "@/package.json";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Admin API Documentation",
            version,
        },
        components: {
            securitySchemas: {},
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["@/resources/**/*.ts"],
};

export default options;
