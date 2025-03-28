import express from "express";
import dotenv from "dotenv";
import { connectDB, getSequelize } from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import cookieParser from "cookie-parser";
import { initModels } from "./models";
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const sequelize = getSequelize();
connectDB();
initModels(sequelize);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
