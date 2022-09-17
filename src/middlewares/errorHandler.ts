import { isCelebrateError } from "celebrate";
import type { Request, Response, NextFunction } from "express";
import { AppException } from "~exceptions/AppException";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof AppException) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (isCelebrateError(error)) {
    const types = ["body", "query", "headers", "params"];

    const errors = types.reduce((acc, type) => {
      const celebrateError = error.details.get(type)?.details[0].message;

      if (!celebrateError) return acc;

      const formattedErrorMessage = celebrateError.replace(/"/g, "");

      return [...acc, formattedErrorMessage];
    }, [] as string[]);

    return response.status(400).json({
      message: errors[0] ?? "General validation error", // return only the first error
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return response.status(500).json({
      message: error.message
    });
  }

  return response.status(500).json({
    message: `Internal server error: ${error.message}`,
  });
};
