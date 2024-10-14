import { Router } from "express";
import {
  createSession,
  success,
  cancel,
} from "../controllers/payment.controller.js";

const router = Router();

router.get("/create-checkout-session", createSession);
router.get("/success", success);
router.get("/cancel", cancel);

export default router;
