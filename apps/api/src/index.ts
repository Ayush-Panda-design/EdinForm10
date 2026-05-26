import "dotenv/config";
import { logger } from "@repo/logger";
import { app } from "./server";
import { env } from "./env";

const PORT = parseInt(env.PORT ?? "8000", 10);

// Fallback: always write startup to stdout directly
process.stdout.write(`[startup] Starting EdinForm API on port ${PORT}\n`);
process.stdout.write(`[startup] NODE_ENV: ${process.env.NODE_ENV}\n`);
process.stdout.write(`[startup] DATABASE_URL set: ${!!process.env.DATABASE_URL}\n`);

app.listen(PORT, () => {
  logger.info(`🚀 EdinForm API running on port ${PORT}`);
  logger.info(`📚 Scalar docs: http://localhost:${PORT}/docs`);
  logger.info(`🔌 tRPC endpoint: http://localhost:${PORT}/trpc`);
  logger.info(`🌐 REST endpoint: http://localhost:${PORT}/api`);

  // Also write directly to stdout as backup
  process.stdout.write(`[ready] Server listening on port ${PORT}\n`);
});

process.on("unhandledRejection", (reason) => {
  process.stderr.write(`[unhandledRejection] ${String(reason)}\n`);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  process.stderr.write(`[uncaughtException] ${err.message}\n${err.stack}\n`);
  process.exit(1);
});
