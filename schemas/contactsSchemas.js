import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.min": "Name should be at least 3 characters",
    "string.max": "Name should be less than 20 characters",
    "any.required": "Set name for contact",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email is not valid",
    "any.required": "Set email for contact",
  }),

  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone is not valid",
      "any.required": "Set phone for contact",
    }),
  favorite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    "string.min": "Name should be at least 3 characters",
    "string.max": "Name should be less than 20 characters",
  }),

  email: Joi.string().email().optional().messages({
    "string.email": "Email is not valid",
  }),

  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .optional()
    .messages({
      "string.pattern.base": "Phone is not valid",
    }),
  favorite: Joi.boolean().optional(),
})
  .min(1)
  .messages({ "object.min": "Set at least one field to update" });

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Set favorite for contact",
  }),
})
  .min(1)
  .messages({ "object.min": "Set favorite for contact" });
