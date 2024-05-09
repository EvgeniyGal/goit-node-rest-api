import contactModel from "../models/Contact.js";

export const getAllContacts = async () => {
  return await contactModel.find();
};

export const getOneContact = async (_id) => {
  return await contactModel.findById(_id);
};

export const deleteContact = async (_id) => {
  return await contactModel.findByIdAndDelete(_id);
};

export const createContact = async (body) => {
  return await contactModel.create(body);
};

export const updateContact = async (_id, body) => {
  return await contactModel.findByIdAndUpdate(_id, body);
};

export default {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
};
