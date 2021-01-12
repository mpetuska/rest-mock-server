import "source-map-support/register";
import "express-async-errors";
import express, { Handler } from "express";
import env from "./env";
import clearRouter from "./api/clear";
import configRouter from "./api/config";
import mockRouter from "./api/mock";
import bodyParser from "body-parser";
import compression from "compression";

env
  .then(async () => {
    const app = express();
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
