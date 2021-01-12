import { Schema } from "joi";
import { Handler } from "express";

export default (schema: Schema): Handler => {
  return (req, res, next) => {
    const { body } = req;
    const { error, value } = schema.validate(body);
    if (error) {
      return res.status(400).json(error);
    } else {
      req.body = value;
      next();
    }
  };
};
