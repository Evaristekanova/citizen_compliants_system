import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await UserService.getAll();
    res.json(users);
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const user = await UserService.getById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  }

  static async create(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const updated = await UserService.update(id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  }

  static async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const deleted = await UserService.remove(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(204).send();
  }
}
