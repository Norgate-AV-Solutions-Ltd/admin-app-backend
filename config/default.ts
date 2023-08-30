export default {
    port: 3500,
    db: {
        uri: "mongodb://localhost:27017/db",
    },
    cors: {
        origins: ["http://localhost:3000"],
    },
};
