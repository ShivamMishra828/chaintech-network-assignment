import { logger } from '@config/logger-config';
import {
    createTaskSchema,
    updateTaskDetailsSchema,
    updateTaskStatusSchema,
} from '@schemas/index';
import { ErrorResponse } from '@utils/responses';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

// Middleware to validate incoming create task requests against the schema
export async function validateIncomingRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // Attempt to parse the incoming request body against the create task schema
    const result = createTaskSchema.safeParse(req.body);

    // If the parsing fails, log the error and return a validation error response
    if (result.error) {
        const errors = result.error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));

        // Log validation errors for debugging
        logger.error(
            `Validation failed for create task request: ${JSON.stringify(errors)}`,
        );

        res.status(StatusCodes.BAD_REQUEST).json(
            new ErrorResponse(errors, 'Validation Error'),
        );
        return;
    }
    // If the parsing succeeds, proceed to the next middleware function
    next();
}

// Middleware to validate the task ID in the incoming request params
export function validateTaskId(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // Extract the task ID from the request params
    const { taskId } = req.params;

    // Check if the task ID is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(taskId)) {
        // Log the error and return a validation error response
        logger.error(`Invalid task id: ${taskId}`);
        res.status(StatusCodes.BAD_REQUEST).json(
            new ErrorResponse(
                [{ path: 'taskId', message: 'Invalid task id' }],
                'Validation Error',
            ),
        );
        return;
    }
    // If the parsing succeeds, proceed to the next middleware function
    next();
}

// Middleware to validate incoming update task details requests against the schema
export async function validateIncomingUpdateDetailsRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // Attempt to parse the incoming request body against the update task details schema.
    const result = updateTaskDetailsSchema.safeParse(req.body);

    // If the parsing fails, log the error and return a validation error response.
    if (result.error) {
        const errors = result.error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));
        // Log validation errors for debugging
        logger.error(
            `Validation failed for update task details request: ${JSON.stringify(errors)}`,
        );

        res.status(StatusCodes.BAD_REQUEST).json(
            new ErrorResponse(errors, 'Validation Error'),
        );
        return;
    }
    // If the parsing succeeds, proceed to the next middleware function.
    next();
}

// Middleware to validate incoming update task status requests against the schema.
export async function validateIncomingUpdateStatusRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // Attempt to parse the incoming request body against the update task status schema.
    const result = updateTaskStatusSchema.safeParse(req.body);

    // If the parsing fails, log the error and return a validation error response.
    if (result.error) {
        const errors = result.error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));
        // Log validation errors for debugging
        logger.error(
            `Validation failed for update task status request: ${JSON.stringify(errors)}`,
        );

        res.status(StatusCodes.BAD_REQUEST).json(
            new ErrorResponse(errors, 'Validation Error'),
        );
        return;
    }
    // If the parsing succeeds, proceed to the next middleware function.
    next();
}
