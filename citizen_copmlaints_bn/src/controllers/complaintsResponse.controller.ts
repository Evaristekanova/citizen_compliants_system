import { Request, Response } from "express";
import { ComplaintResponseService } from "../services/complaintResponse.service";

export class ComplaintResponseController {
  static async create(req: Request, res: Response) {
    const response = await ComplaintResponseService.create(req.body);
    res.status(201).json({
      message: "Response created successfully",
      data: response,
      status: 201,
    });
  }

  static async findAll(_req: Request, res: Response) {
    const responses = await ComplaintResponseService.findAll();
    res.status(200).json({
      message: "Responses retrieved successfully",
      data: responses,
      status: 200,
    });
  }

  static async findOne(req: Request, res: Response) {
    const response = await ComplaintResponseService.findOne(
      Number(req.params.id)
    );
    if (!response)
      return res
        .status(404)
        .json({ message: "Response not found", status: 404 });

    res.status(200).json({
      message: "Response retrieved successfully",
      data: response,
      status: 200,
    });
  }

  static async update(req: Request, res: Response) {
    const updated = await ComplaintResponseService.update(
      Number(req.params.id),
      req.body
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: "Response not found", status: 404 });

    res.status(200).json({
      message: "Response updated successfully",
      data: updated,
      status: 200,
    });
  }

  static async delete(req: Request, res: Response) {
    const deleted = await ComplaintResponseService.delete(
      Number(req.params.id)
    );
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Response not found", status: 404 });

    res.status(204).send();
  }
}
