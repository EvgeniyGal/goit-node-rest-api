import HttpError from "./HttpError.js";
import ObjectId from "mongoose";

const validateId = (req, res, next) => {
  const isValidObjectId = ObjectId.isValidObjectId(req.params.id);
  if (!isValidObjectId) {
    res.setHeader("Content-Type", "application/json");
    next(HttpError(400, `Wrong id format: ${req.params.id}`));
  }
  next();
};

export default validateId;
