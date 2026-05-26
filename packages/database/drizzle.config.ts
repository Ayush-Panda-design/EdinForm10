import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";

// Load .env only in local dev — on Render, env vars are already in process.env
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const databaseUrl = process.env.DATABASE_URL;


if (!databaseUrl) {
  process.stderr.write(
    "[drizzle-config] ERROR: DATABASE_URL is not set.\n" +
    "On Render: add DATABASE_URL in the Environment tab.\n"
  );
  process.exit(1);  // shows message before failing, throw gets swallowed by pnpm
}

process.stdout.write("[drizzle-config] DATABASE_URL loaded ✓\n");

export default defineConfig({
  out: "./drizzle",
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
