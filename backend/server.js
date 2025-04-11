import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Products API");
});

app.listen(port, () => {
  connectDB();
  console.log(`server started at port at http://localhost:${port}`);
});
