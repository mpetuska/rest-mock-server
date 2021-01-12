import { Handler } from "express";
import mockManager from "../service/mockManager";
import PromiseRouter from "express-promise-router";

const controller: Handler = async (req, res) => {
  const { path } = req;
  const mock = await mockManager.pop(path);
  if (!mock) {
    return res.sendStatus(404);
  } else if (mock.handler) {
    return eval(mock.handler)(req, res);
  } else if (mock.response) {
    const { body, status } = mock.response;
    return res.status(status).json(body);
  } else {
    return res.sendStatus(500);
  }
};

export default PromiseRouter({ mergeParams: true }).get("/*", controller);
