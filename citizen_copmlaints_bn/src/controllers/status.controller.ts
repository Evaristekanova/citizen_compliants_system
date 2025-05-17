/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusService } from "../services/status.service";

export class StatusController {
  static async create(req: Request, res: Response) {
    try {
      const status = await StatusService.create(req.body);
      res.status(201).json({
        message: "Status created successfully",
        data: status,
        status: 201,
      });
    } catch (error:any) {
      res.status(400).json({ message: error.message, status: 400 });
    }
  }

  static async findAll(_req: Request, res: Response) {
    try {
      const statuses = await StatusService.findAll();
      res.status(200).json({
        message: "Statuses retrieved successfully",
        data: statuses,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", status: 500 });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const status = await StatusService.findOne(Number(req.params.id));
      if (!status)
        return res
          .status(404)
          .json({ message: "Status not found", status: 404 });
      res.status(200).json({
        message: "Status retrieved successfully",
        data: status,
        status: 200,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", status: 500 });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await StatusService.update(
        Number(req.params.id),
        req.body
      );
      if (!updated)
        return res
          .status(404)
          .json({ message: "Status not found", status: 404 });
      res.status(200).json({
        message: "Status updated successfully",
        data: updated,
        status: 200,
      });
    } catch (error:any) {
      res.status(400).json({ message: error.message, status: 400 });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await StatusService.delete(Number(req.params.id));
      if (!deleted)
        return res.status(404).json({
          message: "Status not found or already deleted",
          status: 404,
        });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error", status: 500 });
    }
  }
}
