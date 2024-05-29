import usersServices from "../services/usersServices.js";
import fs from "fs";
import Jimp from "jimp";
import path from "path";
import sgMail from "@sendgrid/mail";

const NOT_FOUND = "User not found";
const AVATARS_PATH = path.resolve("public", "avatars");

export const createUser = async (req, res) => {
  const body = req.body;
  const user = await usersServices.getOneUserByEmail(body.email);
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const result = await usersServices.createUser(body);
  sendEmail(result.email, result.verificationToken, () => {
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    });
  });
};

export const loginUser = async (req, res) => {
  const body = req.body;
  const user = await usersServices.loginUser(body);
  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  if (!user.verify) {
    res.status(401).json({ message: "Email not verified" });
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
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }
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

export const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;
  if (!verificationToken) {
    res.status(400).json({ message: "Verification token is missing" });
    return;
  }
  const user = await usersServices.verifyToken(verificationToken);
  if (!user) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  res.status(200).json({ message: "Verification successful" });
};

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await usersServices.getOneUserByEmail(email);
  if (!user) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }
  sendEmail(email, user.verificationToken, () =>
    res.status(200).json({ message: "Verification email sent" })
  );
};

const sendEmail = (email, verificationToken, resCallback) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`,
    from: "evgeniygal@gmail.com",
    subject: "Contacts service, welcome! Confirm your email",
    text: `Verify your email address: ${verificationToken}`,
    html: `<h1>Verify your email address</h1><p>You're almost set to start enjoying Contacts service. Simply click the link below to verify your email address and get started. The link expires in 24 hours.</p><a href="${process.env.EMAIL_BASE_URL}/api/users/verify/${verificationToken}">Confirm email</a>`,
  };
  sgMail
    .send(msg)
    .then(resCallback)
    .catch((error) => {
      console.error(error);
    });
};
