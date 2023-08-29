import mongoose from "mongoose";
import config from "config";

async function connect() {
    try {
        const uri = config.get<string>("db.uri");

        if (!uri) {
            throw new Error("DATABASE_URI environment variable not set");
        }

        await mongoose.connect(uri);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connect;
