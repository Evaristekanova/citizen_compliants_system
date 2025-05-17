import { Router } from "express";
import { ComplaintResponseController } from "../controllers/complaintsResponse.controller";

const router = Router();

router.post("/", ComplaintResponseController.create);
router.get("/", ComplaintResponseController.findAll);
router.get("/:id", ComplaintResponseController.findOne);
router.put("/:id", ComplaintResponseController.update);
router.delete("/:id", ComplaintResponseController.delete);

export default router;
