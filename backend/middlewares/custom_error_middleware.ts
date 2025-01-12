import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger"; // Assume you have a logger utility
import { CustomError } from "../errors/global_error_handler";

interface ErrorResponse {
  success: boolean;
  errors: Array<{
    message: string;
    field?: string;
  }>;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error
  logger.error({
    error: err,
    requestId: req.headers["x-request-id"],
    path: req.path,
    method: req.method,
    body: req.body,
  });

  // Handle known errors
  if (err instanceof CustomError) {
    const response: ErrorResponse = {
      success: false,
      errors: err.serializeErrors(),
    };
    res.status(err.statusCode).send(response);
  }
  // Handle unexpected errors
  console.error("Unexpected error:", err);
  const response: ErrorResponse = {
    success: false,
    errors: [{ message: "Something went wrong" }],
  };
  res.status(500).json(response);
};
