import { Router } from "express";
import menuRoutes from "../modules/menu/menu.routes";
import orderRoutes from "../modules/orders/order.routes";

const router = Router();

router.use("/menu", menuRoutes);
router.use("/orders", orderRoutes);

export default router;
