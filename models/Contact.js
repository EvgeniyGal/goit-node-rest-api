import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import { regexEmail, regexPhone } from "./constants.js";

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: regexEmail,
    },
    phone: {
      type: String,
      match: regexPhone,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    versionKey: false,
  }
);

contact.post("save", handleSaveError);
contact.pre("findOneAndUpdate", setUpdateSettings);
contact.post("findOneAndUpdate", handleSaveError);

export default model("Contact", contact);
