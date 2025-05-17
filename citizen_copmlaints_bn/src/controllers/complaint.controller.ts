import { Request, Response } from "express";
import { ComplaintService } from "../services/complaint.service";

export class ComplaintController {
  static async create(req: Request, res: Response) {
    const complaint = await ComplaintService.create(req.body);
    res.status(201).json({
      message: "Complaint created successfully",
      data: complaint,
      status: 201,
    });
  }

  static async findAll(_req: Request, res: Response) {
    const complaints = await ComplaintService.findAll();
    res.status(200).json({
      message: "Complaints retrieved successfully",
      data: complaints,
      status: 200,
    });
  }

  static async findOne(req: Request, res: Response) {
    const complaint = await ComplaintService.findOne(Number(req.params.id));
    if (!complaint) {
      return res
        .status(404)
        .json({ message: "Complaint not found", status: 404 });
    }
    res.status(200).json({
      message: "Complaint retrieved successfully",
      data: complaint,
      status: 200,
    });
  }

  static async update(req: Request, res: Response) {
    const updated = await ComplaintService.update(
      Number(req.params.id),
      req.body
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Complaint not found", status: 404 });
    }
    res.status(200).json({
      message: "Complaint updated successfully",
      data: updated,
      status: 200,
    });
  }

  static async delete(req: Request, res: Response) {
    const deleted = await ComplaintService.delete(Number(req.params.id));
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Complaint not found", status: 404 });
    }
    res.status(204).send();
  }
}
