import { CookieOptions } from "express";

const options: CookieOptions = {
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
};

export default options;
