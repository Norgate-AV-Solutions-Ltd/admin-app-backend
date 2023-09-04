import { Router } from "express";

interface Controller {
    path: string;
    router: Router;
    onAppDidStart?: () => void;
}

export default Controller;
