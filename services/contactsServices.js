import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContacts = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContacts = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: nanoid() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

export default {
  listContacts,
  getContactById,
  removeContacts,
  addContacts,
  updateContact,
};
