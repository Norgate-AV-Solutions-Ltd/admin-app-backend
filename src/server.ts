import express from "express";
import path from "path";
import { router } from "./routes/root";

const app = express();
const PORT = process.env.PORT || 3500;

app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", router);

app.all("*", (req, res) => {
    res.status(404);

    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "./views/404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not found" });
    } else {
        res.type("txt").send("404 Not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
