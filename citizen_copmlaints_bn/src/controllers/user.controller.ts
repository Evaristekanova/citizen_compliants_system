import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await UserService.login(email, password);
    if ("error" in token) {
      return res.status(400).json({ error: token.error, status: 400 });
    }
    res.status(200).json({
      message: "Login successful",
      data: token,
      status: 200,
    });
  }

  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.json({
        data: users,
        message: "Users retrieved successfully",
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await UserService.getById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        message: "success",
        data: user,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const result = await UserService.create(req.body);
      if ("error" in result) {
        return res.status(400).json({ error: result.error, status: 400 });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newUser } = result;
      res.status(201).json({
        message: "A user has been created successfully",
        data: newUser,
        status: 201,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await UserService.update(id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...updatedUser } = user;
      res.json({
        message: "A user has been updated successfully",
        data: updatedUser,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await UserService.remove(id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}
