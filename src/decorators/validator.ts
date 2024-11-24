import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function Validator<T = z.ZodSchema>(schema: z.ZodSchema<T>) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const schemaParsed = await schema.parseAsync(req.body)
                req.body = schemaParsed;
    
                next();
            } catch (error) {
                console.error(error)
                const message = (error as z.ZodError).errors.map(e => e.message).join(' | ');
                
                return res.status(400).json({
                    code: 400,
                    message,
                })
            }

            return originalMethod.apply(req, res, next)
        }

        return descriptor;
    }
}