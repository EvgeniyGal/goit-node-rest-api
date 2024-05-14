import jwt from "jsonwebtoken";
import usersServices from "../services/usersServices.js";

export const validateToken = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    const user = await usersServices.getOneUserByEmail(decoded.email);
    if (!user || user.token !== token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    req.user = user;
    next();
  });
};
