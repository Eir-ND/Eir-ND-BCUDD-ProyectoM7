import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/checkout", paymentRoutes);
app.use("/api", authRoutes);
app.use("/api", productRoutes);

export default app;
