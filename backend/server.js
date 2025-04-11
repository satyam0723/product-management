import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed", err);
  });
