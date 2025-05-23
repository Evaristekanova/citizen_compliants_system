import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleswares/auth.middleware";

const router = Router();
console.log("typeof UserController.update:", typeof UserController.update);
router.get("/", authenticate, UserController.getAll);
router.post("/", UserController.create);

router.get("/:id", UserController.getById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.remove);

export default router;
