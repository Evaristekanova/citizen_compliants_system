import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async create(req: Request, res: Response) {
    try {
      const category = await CategoryService.create(req.body);
      res.status(201).json({
        message: "Category created successfully",
        data: category,
        status: 201,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message, status: 400 });
      } else {
        res
          .status(400)
          .json({ message: "Unknown error occurred", status: 400 });
      }
    }
  }

  static async findAll(_req: Request, res: Response) {
    try {
      const categories = await CategoryService.findAll();
      res.status(200).json({
        message: "Categories retrieved successfully",
        data: categories,
        status: 200,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const category = await CategoryService.findOne(Number(req.params.id));
      if (!category) {
        return res
          .status(404)
          .json({ message: "Category not found", status: 404 });
      }
      res.status(200).json({
        message: "Category retrieved successfully",
        data: category,
        status: 200,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await CategoryService.update(
        Number(req.params.id),
        req.body
      );
      if (!updated) {
        return res
          .status(404)
          .json({ message: "Category not found", status: 404 });
      }
      res.status(200).json({
        message: "Category updated successfully",
        data: updated,
        status: 200,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await CategoryService.delete(Number(req.params.id));
      if (!deleted) {
        return res.status(404).json({
          message: "Category not found or already deleted",
          status: 404,
        });
      }
      res.status(204).send();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }
}
