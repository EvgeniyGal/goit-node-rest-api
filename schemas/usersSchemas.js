import Joi from "joi";
import { regexEmail } from "../models/constants.js";

export const userSignUpSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Set password for user",
  }),
  email: Joi.string().pattern(regexEmail).required().messages({
    "any.required": "Set email for user",
    "string.pattern.base": "Email is not valid",
  }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .optional()
    .messages({
      "any.only": "Set subscription for user (stater, pro or business)",
    }),
});

export const userResendVerificationEmailSchema = Joi.object({
  email: Joi.string().pattern(regexEmail).required().messages({
    "any.required": "missing required field email",
    "string.pattern.base": "Email is not valid",
  }),
});

export const userSignInSchema = Joi.object({
  email: Joi.string().pattern(regexEmail).required().messages({
    "string.email": "Email is not valid",
    "any.required": "Set email for user",
    "string.pattern.base": "Email is not valid",
  }),
  password: Joi.string().required().messages({
    "any.required": "Set password for user",
  }),
});

export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Set subscription for user",
      "any.only": "Set subscription for user (stater, pro or business)",
    }),
});
