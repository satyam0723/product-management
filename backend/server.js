import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());  
app.use(express.json());
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`server started at port at http://localhost:${port}`);
});
