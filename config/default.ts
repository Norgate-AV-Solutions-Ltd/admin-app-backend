export default {
    port: 3500,
    db: {
        uri: "",
    },
    cors: {
        origins: ["http://localhost:3000"],
    },
    user: {
        password: {
            saltWorkFactor: 10,
        },
    },
    jwt: {
        secret: "",
    },
    api: {
        root: "/api/v1",
    },
};
