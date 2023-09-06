import { Router } from "express";
import { AppInfo } from "./app.interface";

interface Controller {
    path: string;
    router: Router;
    onAppDidStart?: (info: AppInfo) => void;
}

export default Controller;
