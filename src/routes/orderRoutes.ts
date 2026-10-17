import { Router } from "express";
import * as orderController from "../controllers/orderController.js";

const router = Router();

router.post("/orders", orderController.create);

router.get(
  "/orders/customer/:customerDocument",
  orderController.getByCustomerDocument,
);
router.get("/orders/:id", orderController.getById);

router.patch("/orders/:id/cancel", orderController.cancel);

export default router;
