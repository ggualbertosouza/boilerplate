import { NextFunction, Request, Response } from 'express';
import HttpError from '../../domain/errors';
import { StatusCodes } from '../../domain/constants/httpConstants';

export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const code = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  console.error(err);

  res.status(code).json({
    message: err.message || 'INTERNAL SERVER ERROR',
    code,
  });
}
