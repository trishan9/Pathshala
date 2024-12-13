import cluster from "cluster";
import { cpus } from "os";
import { logger } from "@/logging/logger";
import { app } from "./app";
import config from "./config";

const PORT = config.app.port;
const isProduction = config.app.isProduction;

if (isProduction) {
  const numCpus = cpus().length;

  if (cluster.isPrimary) {
    logger.info(`Master thread is running on ${process.pid}`);
    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on("exit", () => {
      cluster.fork();
    });
  } else {
    app.listen(PORT, () => {
      logger.info(`Production server is running on ${process.pid}`);
    });
  }
} else {
  app.listen(PORT, () => {
    logger.info(`Development server is running at: ${PORT}`);
  });
}
