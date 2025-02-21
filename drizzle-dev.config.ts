import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/models",
    dbCredentials: {
      url: process.env.DATABASE_URL!
    },
    migrations: {
      table: 'my-migrations-table', // `__drizzle_migrations` by default
      schema: 'public', // used in PostgreSQL only, `drizzle` by default
    },
  });
  