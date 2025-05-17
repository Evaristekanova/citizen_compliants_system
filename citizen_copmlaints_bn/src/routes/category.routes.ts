import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.post("/", CategoryController.create);
router.get("/", CategoryController.findAll);
router.get("/:id", CategoryController.findOne);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
