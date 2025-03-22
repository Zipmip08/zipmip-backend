import express from "express";
import dotenv from "dotenv";
import { connectDB, getSequelize } from "./config/db";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { initModels } from "./models";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(express.json());
app.use(cookieParser());

const sequelize = getSequelize();
connectDB();
initModels(sequelize);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
