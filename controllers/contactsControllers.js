import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContacts(id);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const body = req.body;
  const result = await contactsService.addContacts(body);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await contactsService.updateContact(id, body);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(result);
};
