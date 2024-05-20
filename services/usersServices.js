import { createToken } from "../helpers/jwt.js";
import userModel from "../models/User.js";
import bcrypt from "bcrypt";

const getOneUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const createUser = async (body) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  return await userModel.create({ ...body, password: hashedPassword });
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

const updateSubscription = async (id, body) => {
  return await userModel.findByIdAndUpdate(id, body);
};

export default {
  getOneUserByEmail,
  createUser,
  loginUser,
  logoutUser,
  updateSubscription,
};
