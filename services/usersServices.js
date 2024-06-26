import { createToken } from "../helpers/jwt.js";
import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

const getOneUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const createUser = async (body) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const avatarURL = gravatar.url(body.email, { protocol: "http", s: "250" });
  return await userModel.create({
    ...body,
    avatarURL,
    password: hashedPassword,
  });
};

const loginUser = async (body) => {
  const user = await getOneUserByEmail(body.email);
  if (!user) {
    return null;
  }
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  const userWithToken = await userModel.findByIdAndUpdate(user._id, {
    token: createToken({
      email: user.email,
      subscription: user.subscription,
    }),
  });
  return userWithToken;
};

const logoutUser = async (id) => {
  return await userModel.findByIdAndUpdate(id, { token: null });
};

const updateUserData = async (id, body) => {
  return await userModel.findByIdAndUpdate(id, body);
};

const deleteUsers = async () => {
  return await userModel.deleteMany();
};

export default {
  getOneUserByEmail,
  createUser,
  loginUser,
  logoutUser,
  updateUserData,
  deleteUsers,
};
