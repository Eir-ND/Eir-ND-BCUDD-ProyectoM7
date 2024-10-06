import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const mongo = process.env.MONGO_URI;
  try {
    await mongoose.connect(mongo);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
