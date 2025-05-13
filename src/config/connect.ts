import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseURI = process.env.DATABASE_URI as string;

if (!databaseURI) {
    console.error("Database URI not provided!")
    process.exit(1); 
}
export const connectDB = async () => {
  try {
    await mongoose.connect(databaseURI);
    console.log("mongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
