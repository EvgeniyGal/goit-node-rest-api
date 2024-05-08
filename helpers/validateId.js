import HttpError from "./HttpError.js";
import ObjectId from "mongoose";

const validateId = (req, _, next) => {
  const isValidObjectId = ObjectId.isValidObjectId(req.params.id);
  if (!isValidObjectId) {
    next(HttpError(400, `Wrong id format: ${req.params.id}`));
  }
  next();
};

export default validateId;
