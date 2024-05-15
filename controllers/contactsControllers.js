import contactsService from "../services/contactsServices.js";

const NOT_FOUND = "Not found";

export const getAllContacts = async (req, res) => {
  const result = await contactsService.getAllContacts(req.user._id, req.query);
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getOneContact(req.user._id, id);
  if (!result) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.deleteContact(req.user._id, id);
  if (!result) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const body = req.body;
  const result = await contactsService.createContact(req.user._id, body);
  res.json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await contactsService.updateContact(req.user._id, id, body);
  if (!result) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  res.json(result);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const contact = await contactsService.updateContact(req.user._id, id, body);
  if (!contact) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  res.json(contact);
};
