import usersServices from "../services/usersServices.js";

const NOT_FOUND = "Not found";

export const createUser = async (req, res) => {
  const body = req.body;
  const user = await usersServices.getOneUserByEmail(body.email);
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const result = await usersServices.createUser(body);
  res
    .status(201)
    .json({ user: { email: result.email, subscription: result.subscription } });
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
  res.status(200).json({ email: user.email, subscription: user.subscription });
};

export const updateSubscription = async (req, res) => {
  const body = req.body;
  const user = await usersServices.updateSubscription(req.user._id, body);
  if (!user) {
    res.status(404).json({ message: NOT_FOUND });
    return;
  }
  res.status(200).json({ email: user.email, subscription: user.subscription });
};
