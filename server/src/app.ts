import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/middlewares/globalErrorHandler";
import { apiRequestLogger } from "@/logging/logger";
import { rootRouter } from "@/routes";
import config from "./config";

const app = express();

app.use(cors(config.cors));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(apiRequestLogger);

app.get("/health", (_, res) => {
  return res.send("healthy");
});

app.use("/v1", rootRouter);

app.use(errorHandler);

export { app };
