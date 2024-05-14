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
  res.status(201).json(result);
};
