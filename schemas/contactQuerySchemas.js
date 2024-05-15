import Joi from "joi";
import { regexEmail, regexPhone } from "../models/constants.js";

export const contactQuerySchemas = Joi.object({
  favorite: Joi.boolean().optional().messages({
    "boolean.base": "Favorite should be boolean",
  }),
  limit: Joi.number().min(1).optional().messages({
    "number.base": "Limit should be number",
    "number.min": "Limit should be at least 1",
  }),
  page: Joi.number().min(1).optional().messages({
    "number.base": "Page should be number",
    "number.min": "Page should be at least 1",
  }),
})
  .when(Joi.object({ page: Joi.exist() }).unknown(), {
    then: Joi.object({
      limit: Joi.number().min(1).required().messages({
        "number.base": "Limit should be number",
        "number.min": "Limit should be at least 1",
        "any.required": "If you set page, you should Set limit for query",
      }),
    }),
  })
  .when(Joi.object({ limit: Joi.exist() }).unknown(), {
    then: Joi.object({
      page: Joi.number().min(1).required().messages({
        "number.base": "Page should be number",
        "number.min": "Page should be at least 1",
        "any.required": "If you set limit, you should Set page for query",
      }),
    }),
  });
