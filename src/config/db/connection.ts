import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const uri = process.env.DATABASE_URI;

        if (!uri) {
            throw new Error("DATABASE_URI environment variable not set");
        }

        await mongoose.connect(uri);
    } catch (err) {
        console.log(err);
    }
};
