import express from "express";
import env from "./env";

env
  .then(async () => {
    const app = express();

    app.listen(process.env.PORT, () =>
      console.info(
        `Application running at http://localhost:${process.env.PORT}`
      )
    );
  })
  .catch((e) => console.error("Application failed to start", e));
