import {
    createTaskSchema,
    updateTaskDetailsSchema,
    updateTaskStatusSchema,
} from '@schemas/index';
import { ErrorResponse } from '@utils/responses';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

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

export function validateTaskId(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { taskId } = req.params;
    if (!Types.ObjectId.isValid(taskId)) {
        res.status(StatusCodes.BAD_REQUEST).json(
            new ErrorResponse(
                [{ path: 'taskId', message: 'Invalid task id' }],
                'Validation Error',
            ),
        );
    }
    next();
}

export async function validateIncomingUpdateDetailsRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const result = updateTaskDetailsSchema.safeParse(req.body);
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

export async function validateIncomingUpdateStatusRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const result = updateTaskStatusSchema.safeParse(req.body);
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
