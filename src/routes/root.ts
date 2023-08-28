import express from "express";
import path from "path";

const router = express.Router();

router.get("^/$|/index(.html)?", (_, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

export { router as root };
