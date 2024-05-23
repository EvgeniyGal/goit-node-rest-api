import usersServices from "../services/usersServices.js";
import fs from "fs";
import Jimp from "jimp";
import path from "path";

const NOT_FOUND = "Not found";
const AVATARS_PATH = path.resolve("public", "avatars");

export const createUser = async (req, res) => {
  const body = req.body;
  const user = await usersServices.getOneUserByEmail(body.email);
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const result = await usersServices.createUser(body);
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

export const loginUser = async (req, res) => {
  const body = req.body;
  const user = await usersServices.loginUser(body);
  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  res.status(200).json({
    user: { email: user.email, subscription: user.subscription },
    token: user.token,
  });
};

export const logoutUser = async (req, res) => {
  const result = await usersServices.logoutUser(req.user._id);
  if (!result) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  res.status(204).send();
};

export const getCurrentUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  });
};

export const updateSubscription = async (req, res) => {
  const body = req.body;
  const user = await usersServices.updateUserData(req.user._id, body);
  if (!user) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  res.status(200).json({ email: user.email, subscription: user.subscription });
};

export const updateAvatar = async (req, res) => {
  const { _id, avatarURL } = req.user;
  const { path: oldPath, filename } = req.file;
  const newFilePath = path.join(AVATARS_PATH, filename);
  Jimp.read(oldPath)
    .then((image) => {
      return image.resize(250, 250).quality(60).write(newFilePath);
    })
    .catch((err) => {
      console.error(err);
    });
  if (fs.existsSync(path.join("public", avatarURL))) {
    fs.unlinkSync(path.join("public", avatarURL));
  }
  fs.unlink(oldPath, () => {});
  const avatar = path.join("avatars", filename);
  const updatedUser = await usersServices.updateUserData(_id, {
    avatarURL: avatar,
  });
  res.status(200).json({
    avatarURL: updatedUser.avatarURL,
  });
};
