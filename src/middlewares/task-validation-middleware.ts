import { createTaskSchema } from '@schemas/index';
import { ErrorResponse } from '@utils/responses';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function validateIncomingRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const result = createTaskSchema.safeParse(req.body);
    if (result.error) {
        const errors = result.error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));

        res.status(StatusCodes.BAD_REQUEST).json(
            new ErrorResponse(errors, 'Validation Error'),
        );
    }
    next();
}
