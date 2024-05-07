import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "./schemas/contactsSchemas.js";
import validateBody from "./helpers/validateBody.js";
import "dotenv/config";

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@testcluster.80vox3c.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=testCluster`;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.post("/api/contacts", validateBody(createContactSchema));
app.put("/api/contacts/:id", validateBody(updateContactSchema));
app.patch(
  "/api/contacts/:id/favorite",
  validateBody(updateStatusContactSchema)
);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
