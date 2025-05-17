import { Router } from "express";
import { StatusController } from "../controllers/status.controller";

const router = Router();

router.post("/", StatusController.create);
router.get("/", StatusController.findAll);
router.get("/:id", StatusController.findOne);
router.put("/:id", StatusController.update);
router.delete("/:id", StatusController.delete);

export default router;
