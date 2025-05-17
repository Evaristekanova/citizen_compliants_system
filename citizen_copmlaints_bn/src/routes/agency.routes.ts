import { Router } from "express";
import { AgencyController } from "../controllers/agency.controller";

const router = Router();

router.post("/", AgencyController.create);
router.get("/", AgencyController.findAll);
router.get("/:id", AgencyController.findOne);
router.put("/:id", AgencyController.update);
router.delete("/:id", AgencyController.delete);

export default router;
