import express from "express";
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createCheckoutSession,
  createOrder,
  createCart,
  getCart,
  editCart,
} from "../controllers/payment.controller.js";

const router = Router();

router.get("/create-checkout-session", authRequired, createCheckoutSession);
router.post(
  "/create-order",
  express.raw({ type: "application/json" }),
  createOrder
);
router.post("create-cart", createCart);
router.get("/get-cart", authRequired, getCart);
router.put("/edit-cart", authRequired, editCart);

export default router;
