import pino from "pino";
import path from "path";

const logger = pino({
    transport: {
        targets: [
            {
                level: "info",
                target: "pino-pretty",
                options: {
                    ignore: "pid,hostname",
                    translateTime: "SYS:yyyy-mm-dd HH:MM:ss:l",
                },
            },
            {
                level: "error",
                target: "pino-pretty",
                options: {
                    colorize: false,
                    ignore: "pid,hostname",
                    translateTime: "SYS:yyyy-mm-dd HH:MM:ss:l",
                    destination: path.join(__dirname, "../../logs/error.log"),
                    mkdir: true,
                },
            },
            {
                level: "info",
                target: "pino-pretty",
                options: {
                    colorize: false,
                    ignore: "pid,hostname",
                    translateTime: "SYS:yyyy-mm-dd HH:MM:ss:l",
                    destination: path.join(__dirname, "../../logs/combined.log"),
                    mkdir: true,
                },
            },
        ],
    },
});

export default logger;
