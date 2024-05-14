import express from "express";
import validateBody from "../helpers/validateBody.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/usersSchemas.js";
import { createUser } from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(userSignUpSchema), createUser);

usersRouter.post("/login", validateBody(userSignInSchema), createUser);

usersRouter.post("/logout", createUser);

usersRouter.get("/current", createUser);

usersRouter.patch("/:id", createUser);

export default usersRouter;
