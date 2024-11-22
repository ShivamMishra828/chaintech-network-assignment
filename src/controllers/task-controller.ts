import { createTaskService } from '@services/task-service';
import { SuccessResponse } from '@utils/responses';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function createTaskController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const task = await createTaskService(req.body);
        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(task, 'Task created successfully'),
        );
    } catch (error) {
        next(error);
    }
}
