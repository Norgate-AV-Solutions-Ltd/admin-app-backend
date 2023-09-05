import swaggerJsdoc from "swagger-jsdoc";
import { version } from "@/package.json";

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
        // servers: [
        //     {
        //         url: "https://localhost:3500/api/v1",
        //     },
        // ],
    },
    // host: "https://localhost:3500",
    // basePath: "/api/v1",
    apis: ["./src/resources/healthcheck/healthcheck.controller.ts"],
};

export default options;
