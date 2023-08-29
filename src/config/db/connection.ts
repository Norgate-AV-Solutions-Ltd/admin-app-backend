import mongoose from "mongoose";
import config from "config";

export const dbConnect = async () => {
    try {
        const uri = config.get<string>("db.uri");

        if (!uri) {
            throw new Error("DATABASE_URI environment variable not set");
        }

        await mongoose.connect(uri);
    } catch (err) {
        console.log(err);
    }
};
