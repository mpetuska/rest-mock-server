import express from "express";
import env from "./env";
import configRouter from "./api/config";

env
  .then(async () => {
    const app = express();
    app.use("/config", configRouter);

    app.listen(process.env.PORT, () =>
      console.info(
        `Application running at http://localhost:${process.env.PORT}`
      )
    );
  })
  .catch((e) => console.error("Application failed to start", e));
