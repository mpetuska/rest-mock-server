import Joi from "joi";

export interface MockResponse {
  status: number;
  body?: unknown;
}

export const mockResponseSchema = Joi.object({
  status: Joi.number().min(100).max(999).required(),
  body: Joi.optional(),
});

export interface RequestMock {
  static: boolean;
  handler?: string;
  response?: MockResponse;
}

export const requestMockSchema = Joi.object({
  static: Joi.boolean().default(false),
  handler: Joi.string(),
  response: mockResponseSchema,
});
