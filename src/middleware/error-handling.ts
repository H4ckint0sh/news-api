import { NextFunction, Request, Response } from "express";
import { DatabaseError as DatabaseError, ValidationError as SequelizeValidationError } from "sequelize";

export class HttpError extends Error {
  public message: string;
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class PostgresError extends Error {
  public code: string;
  public status: number;

  constructor(message: string, code: string, status = 500) {
    super(message);
    this.name = "PostgresError";
    this.code = code;
    this.status = status;

    Object.setPrototypeOf(this, PostgresError.prototype);
  }
}

export class ValidationError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.status = 400; // HTTP status code for Bad Request

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandling = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof DatabaseError && "code" in err.original) {
    // Handle PostgreSQL-specific errors

    if (err.original.code === "23502" || err.original.code === "22P02" || err.original.code === "42703") {
      err = new ValidationError("Bad request");
    } else if (err.original.code === "23503") {
      err = new HttpError(404, "Foreign Key Violation");
    } else {
      res.status(500).send({ message: "Internal Server Error" });
      return;
    }
  } else if (err instanceof SequelizeValidationError) {
    err = new ValidationError("Bad request");
  } else if (!(err instanceof HttpError) && !(err instanceof ValidationError)) {
    // If the error is not an instance of HttpError or ValidationError, create a generic HttpError
    err = new HttpError(500, err.message || "Internal Server Error");
  }

  // Handle generic application errors
  res.status((err as HttpError).status || 500).send({
    message: err.message || "Internal Server Error",
  });
};
