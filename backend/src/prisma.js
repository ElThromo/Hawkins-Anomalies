require("dotenv").config();

const { PrismaClient } = require("./generated/prisma");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

if (!process.env.DB_PASSWORD) {
    throw new Error("❌ DB_PASSWORD no está definida en el .env");
}

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "hawkins_anomalies",
    connectionLimit: 10,
    connectTimeout: 10000,
    allowPublicKeyRetrieval: true,
    ssl: false,
    logger: {
        error: (e) => console.error("[ADAPTER ERROR]", e),
        warning: (w) => console.warn("[ADAPTER WARN]", w),
    },
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;