import type { Request, Response, NextFunction } from "express";
import { AppException } from "~exceptions/AppException";

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof AppException) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({
    message: `Erro interno no servidor - ${error.message}`,
  });
};
