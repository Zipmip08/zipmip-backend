// src/config/db.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelizeInstance: Sequelize | null = null;

export const getSequelize = (): Sequelize => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize(
      process.env.DB_NAME!,
      process.env.DB_USER!,
      process.env.DB_PASSWORD!,
      {
        host: process.env.DB_HOST!,
        dialect: "postgres",
        port: Number(process.env.DB_PORT!),
        logging: false,
        timezone: "+03:30",
      }
    );
  }

  return sequelizeInstance;
};

export const connectDB = async (): Promise<void> => {
  const sequelize = getSequelize();
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};
