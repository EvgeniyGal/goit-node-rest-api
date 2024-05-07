import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  const result = await contactsService.getAllContacts();
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getOneContact(id);
  if (!result) {
    res.status(404).json({ message: `Contact with id=${id} not found` });
    return;
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.deleteContact(id);
  if (!result) {
    res.status(404).json({ message: `Contact with id=${id} not found` });
    return;
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const body = req.body;
  const result = await contactsService.createContact(body);
  res.json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await contactsService.updateContact(id, body);
  if (!result) {
    res.status(404).json({ message: `Contact with id=${id} not found` });
    return;
  }
  res.json(result);
};

export const updateStatusContact = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const contact = await contactsService.updateContact(id, body);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(contact);
};
