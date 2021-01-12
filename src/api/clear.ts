import { Handler } from "express";
import mockManager from "../service/mockManager";
import PromiseRouter from "express-promise-router";

const clearAll: Handler = async (req, res) => {
  await mockManager.clearAll();
  res.sendStatus(204);
};
const clear: Handler = async (req, res) => {
  const { path } = req;
  await mockManager.clear(path);
  res.sendStatus(204);
};

export default PromiseRouter({ mergeParams: true })
  .delete("/", clearAll)
  .delete("/*", clear);
