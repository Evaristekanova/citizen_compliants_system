import { Router } from "express";
import { ComplaintController } from "../controllers/complaint.controller";

const router = Router();

router.post("/", ComplaintController.create);
router.get("/", ComplaintController.findAll);
router.get("/:id", ComplaintController.findOne);
router.put("/:id", ComplaintController.update);
router.delete("/:id", ComplaintController.delete);

export default router;
