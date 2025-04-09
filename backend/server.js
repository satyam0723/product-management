import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import productRoutes from "./routes/product.route.js"
import cors from "cors"

const app = express()

app.use(cors())

dotenv.config();

app.use(express.json());
app.use("/api/products", productRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => {
  connectDB();
  console.log(`server started at port at http://localhost:${port}`);
});
