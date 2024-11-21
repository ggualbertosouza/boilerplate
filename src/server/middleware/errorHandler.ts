import { NextFunction, Request, Response } from "express";
import HttpError from "../../infra/errors";

export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
    const code = err.statusCode || 500;
    
    console.error(err)

    res.status(code).json({ 
        message: err.message || 'INTERNAL SERVER ERROR',
        code,
     })
}   