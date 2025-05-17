/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { AgencyService } from "../services/agency.service";

export class AgencyController {
  static async create(req: Request, res: Response) {
    try {
      const agency = await AgencyService.create(req.body);
      res.status(201).json({
        message: "Agency created successfully",
        data: agency,
        status: 201,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: 400 });
    }
  }

  static async findAll(_req: Request, res: Response) {
    try {
      const agencies = await AgencyService.findAll();
      res.json({
        message: "Agencies retrieved successfully",
        data: agencies,
        status: 200,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const agency = await AgencyService.findOne(Number(req.params.id));
      if (!agency)
        return res
          .status(404)
          .json({ message: "Agency not found", status: 404 });
      res.json({
        message: "Agency retrieved successfully",
        data: agency,
        status: 200,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await AgencyService.update(
        Number(req.params.id),
        req.body
      );
      if (!updated)
        return res
          .status(404)
          .json({ message: "Agency not found", status: 404 });
      res.json({
        message: "Agency updated successfully",
        data: updated,
        status: 200,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message, status: 400 });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await AgencyService.delete(Number(req.params.id));
      if (!deleted)
        return res.status(404).json({
          message: "Agency not found or already deleted",
          status: 404,
        });
      res.status(204).send();
    } catch (error: any) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
}
