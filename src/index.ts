import "source-map-support/register";
import "express-async-errors";
import express, { Handler } from "express";
import env from "./env";
import clearRouter from "./api/clear";
import configRouter from "./api/config";
import mockRouter from "./api/mock";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";

process.on("SIGINT", () => {
  console.info("\nReceived SIGINT. Terminating...");
  process.exit(0);
});

env
  .then(async () => {
    const app = express();
    if (!process.env.DISABLE_CORS) {
      console.debug("Allowing CORS");
      app.use(cors());
    } else {
      console.debug("Not Allowing CORS");
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(compression() as Handler);
    app.use("/clear", clearRouter);
    app.use("/config", configRouter);
    app.use("/", mockRouter);

    app.listen(process.env.PORT, () =>
      console.info(
        `Application running at http://localhost:${process.env.PORT}`
      )
    );
  })
  .catch((e) => console.error("Application failed to start", e));
