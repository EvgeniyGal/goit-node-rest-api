import Joi from "joi";
import { regexEmail } from "../models/constants.js";

export const userSignUpSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Set password for user",
  }),
  email: Joi.string().pattern(regexEmail).required().messages({
    "string.email": "Email is not valid",
    "any.required": "Set email for user",
  }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .optional()
    .messages({
      "any.only": "Set subscription for user (stater, pro or business)",
    }),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(regexEmail).required().messages({
    "string.email": "Email is not valid",
    "any.required": "Set email for user",
  }),
  password: Joi.string().required().messages({
    "any.required": "Set password for user",
  }),
});
