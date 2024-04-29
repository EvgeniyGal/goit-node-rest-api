import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Phone is required",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be a valid email address",
  }),
  phone: Joi.string().optional().messages({
    "any.required": "Phone is required",
  }),
}).min(1);
