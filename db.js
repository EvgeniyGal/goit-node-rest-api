import mongoose from "mongoose";
import app from "./app.js";

await mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running. Use our API on port: ${process.env.PORT || 3000}`);
});
