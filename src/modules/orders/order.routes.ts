import { Router } from "express";
import * as orderHandlers from "./order.handlers";

const router = Router();

router.get("/", orderHandlers.getOrders);
router.post("/", orderHandlers.placeOrder);
router.patch("/:id/status", orderHandlers.updateStatus);
router.patch("/:id/priority", orderHandlers.togglePriority);
router.get("/kitchen", orderHandlers.kitchenQueue);

export default router;
