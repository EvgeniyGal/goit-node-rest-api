import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  userSignInSchema,
  userSignUpSchema,
  userUpdateSubscriptionSchema,
} from "../schemas/usersSchemas.js";
import {
  createUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  updateSubscription,
} from "../controllers/usersControllers.js";
import { validateToken } from "../helpers/validateToken.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(userSignUpSchema), createUser);

usersRouter.post("/login", validateBody(userSignInSchema), loginUser);

usersRouter.post("/logout", validateToken, logoutUser);

usersRouter.get("/current", validateToken, getCurrentUser);

usersRouter.patch(
  "/subscription",
  validateToken,
  validateBody(userUpdateSubscriptionSchema),
  updateSubscription
);

export default usersRouter;
