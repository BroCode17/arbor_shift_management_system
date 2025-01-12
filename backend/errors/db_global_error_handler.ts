import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'class-validator';

interface ErrorResponse {
  message: string;
  errors?: { [key: string]: string };
}

function formatValidationErrors(errors: ValidationError[]): ErrorResponse {
  const formattedErrors: { [key: string]: string } = {};

  errors.forEach(error => {
    if (error.constraints) {
      Object.keys(error.constraints).forEach(key => {
        formattedErrors[error.property] = error.constraints![key]; // Ensuring constraints is accessed safely
      });
    }
  });

  return {
    message: 'Validation failed',
    errors: formattedErrors,
  };
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  if (Array.isArray(err) && err[0] instanceof ValidationError) {
    const formattedError = formatValidationErrors(err);
    res.status(400).json(formattedError);
  } else {
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
}
