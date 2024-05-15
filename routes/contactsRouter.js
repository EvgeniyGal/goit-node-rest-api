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
import validateQuery from "../helpers/validateQuery.js";
import { contactQuerySchemas } from "../schemas/contactQuerySchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(validateToken);

contactsRouter.get("/", validateQuery(contactQuerySchemas), getAllContacts);

contactsRouter.get("/:id", validateId, getOneContact);

contactsRouter.delete("/:id", validateId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  validateId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

export default contactsRouter;
