import { Schema, model } from "mongoose";
import { setReturnNew } from "./middlewares.js";

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

contact.pre("findOneAndUpdate", setReturnNew);

export default model("Contact", contact);
