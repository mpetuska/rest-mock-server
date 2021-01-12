import { Handler } from "express";
import PromiseRouter from "express-promise-router";
import { RequestMock, requestMockSchema } from "../domain/RequestMock";
import mockManager from "../service/mockManager";
import schemaValidator from "../util/schemaValidator";

const post: Handler = async (req, res) => {
  const { path } = req;
  const config: RequestMock = req.body;
  await mockManager.save(path, config);
  res.sendStatus(200);
};
const get: Handler = async (req, res) => {
  const { path } = req;
  const configs = await mockManager.get(path);
  res.json(configs);
};

export default PromiseRouter({ mergeParams: true })
  .get("/*", get)
  .post("/*", schemaValidator(requestMockSchema), post);
