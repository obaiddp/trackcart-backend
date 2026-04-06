import { Router } from "express";
import * as menuHandlers from "./menu.handlers";

const router = Router();

router.get("/", menuHandlers.getMenu);
router.post("/", menuHandlers.addMenuItem);
router.patch("/:id/toggle", menuHandlers.toggleItem);
router.get("/category/:category", menuHandlers.getMenuByCategory);

export default router;
