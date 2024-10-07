import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  findAll,
  findOne,
  create,
  remove,
  update,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", authRequired, findAll);
router.get("/products/:id", authRequired, findOne);
router.post("/products", authRequired, create);
router.delete("/products/:id", authRequired, remove);
router.put("/products/:id", authRequired, update);

export default router;
