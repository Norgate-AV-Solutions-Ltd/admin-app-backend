import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { Request, Response, NextFunction } from "express";

const logEvent = async (message: string, fileName: string) => {
    const timestamp = `${format(new Date(), "yyyy-MM-dd HH:mm:ss")}`;
    const log = `[${timestamp}]-[${uuid()}]: ${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "../../logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "../..logs"));
        }

        await fsPromises.appendFile(path.join(__dirname, `../../logs/${fileName}`), log);
    } catch (err) {
        console.log(err);
    }
};

const logger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url, headers, path } = req;

    logEvent(`[${method}]-[${url}]-[${headers.origin}]`, "requests.log");
    console.log(`[${method}]-[${path}]`);

    next();
};

export { logEvent, logger };
