export default {
    port: "PORT",
    db: {
        uri: "DATABASE_URI",
    },
    jwt: {
        access: {
            key: {
                private: "JWT_ACCESS_PRIVATE_KEY",
                public: "JWT_ACCESS_PUBLIC_KEY",
            },
        },
        refresh: {
            key: {
                private: "JWT_REFRESH_PRIVATE_KEY",
                public: "JWT_REFRESH_PUBLIC_KEY",
            },
        },
    },
};
