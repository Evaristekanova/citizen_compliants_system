/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

// Define a custom error interface if needed
interface CustomError extends Error {
  status?: number;
}

export function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err); // Optional logging
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
}
