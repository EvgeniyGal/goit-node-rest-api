import userModel from "../models/User.js";

export const getOneUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

export const createUser = async (body) => {
  return await userModel.create(body);
};

export default {
  getOneUserByEmail,
  createUser,
};
