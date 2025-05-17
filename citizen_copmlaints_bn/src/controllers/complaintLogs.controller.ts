import { Request, Response } from "express";
import { ComplaintLogService } from "../services/complaintLogs.service";

export class ComplaintLogController {
  static async create(req: Request, res: Response) {
    const log = await ComplaintLogService.create(req.body);
    res.status(201).json({
      message: "Complaint log created successfully",
      data: log,
      status: 201,
    });
  }

  static async findAll(_req: Request, res: Response) {
    const logs = await ComplaintLogService.findAll();
    res.status(200).json({
      message: "Complaint logs retrieved successfully",
      data: logs,
      status: 200,
    });
  }

  static async findOne(req: Request, res: Response) {
    const log = await ComplaintLogService.findOne(Number(req.params.id));
    if (!log) {
      return res
        .status(404)
        .json({ message: "Complaint log not found", status: 404 });
    }
    res.status(200).json({
      message: "Complaint log retrieved successfully",
      data: log,
      status: 200,
    });
  }

  static async delete(req: Request, res: Response) {
    const deleted = await ComplaintLogService.delete(Number(req.params.id));
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Complaint log not found", status: 404 });
    }
    res.status(204).send();
  }
}
