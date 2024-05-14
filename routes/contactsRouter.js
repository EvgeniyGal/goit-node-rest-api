import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import validateId from "../helpers/validateId.js";
import { validateToken } from "../helpers/validateToken.js";

const contactsRouter = express.Router();

contactsRouter.get("/", validateToken, getAllContacts);

contactsRouter.get("/:id", validateToken, validateId, getOneContact);

contactsRouter.delete("/:id", validateToken, validateId, deleteContact);

contactsRouter.post(
  "/",
  validateToken,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  validateToken,
  validateId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateToken,
  validateId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

export default contactsRouter;
