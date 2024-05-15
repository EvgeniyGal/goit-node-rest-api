import contactModel from "../models/Contact.js";

const getAllContacts = async (_id, { page, limit, favorite }) => {
  if (page && limit) {
    return await contactModel
      .find(favorite ? { owner: _id, favorite } : { owner: _id })
      .skip((page - 1) * limit)
      .limit(limit);
  }
  if (favorite) {
    return await contactModel.find({ owner: _id, favorite });
  }
  return await contactModel.find({ owner: _id });
};

const getOneContact = async (userId, contactId) => {
  return await contactModel.findById({ _id: contactId, owner: userId });
};

const deleteContact = async (userId, contactId) => {
  return await contactModel.findByIdAndDelete({
    _id: contactId,
    owner: userId,
  });
};

const createContact = async (_id, body) => {
  return await contactModel.create({ ...body, owner: _id });
};

const updateContact = async (userId, contactId, body) => {
  return await contactModel.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body
  );
};

export default {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
};
