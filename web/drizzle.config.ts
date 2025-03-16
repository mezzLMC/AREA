import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({
    path: "../.env"
});

if (!process.env.POSTGRES_HOST || !process.env.POSTGRES_USER || !process.env.POSTGRES_DB) {
    throw new Error("Please provide all the necessary environment variables");
}

export default defineConfig({
    schema: ["../shared/models.ts", "../shared/models/*.ts"],
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD || "",
        database: process.env.POSTGRES_DB,
    },
})
