import HttpError from "./HttpError.js";
import { ObjectId } from "mongodb";

const validateId = (req, _, next) => {
  const isValidObjectId = ObjectId.isValidObjectId(req.params.id);
  if (!isValidObjectId) {
    next(HttpError(400, `Wrong id format: ${req.params.id}`));
  }
  next();
};

export default validateId;
