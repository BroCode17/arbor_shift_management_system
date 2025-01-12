
export abstract class CustomError extends Error {
  abstract statusCode: number;
  
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}



export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: Array<{ message: string; field: string }>) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => ({
      message: err.message,
      field: err.field
    }));
  }
}

export class DatabaseConnectionError extends CustomError {
  statusCode = 503;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to database');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message: string = 'Resource not found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(message: string = 'Unauthorized access') {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}


