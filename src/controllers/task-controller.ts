import {
    createTaskService,
    deleteTaskService,
    fetchAllTasksService,
    fetchTaskByIdService,
    updateTaskDetailsService,
    updateTaskStatusService,
} from '@services/task-service';
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

export async function fetchAllTasksController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const tasks = await fetchAllTasksService();
        res.status(StatusCodes.OK).json(
            new SuccessResponse(tasks, 'Tasks fetched successfully'),
        );
    } catch (error) {
        next(error);
    }
}

export async function fetchTaskByIdController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const task = await fetchTaskByIdService(req.params.taskId);
        res.status(StatusCodes.OK).json(
            new SuccessResponse(task, 'Task fetched successfully'),
        );
    } catch (error) {
        next(error);
    }
}

export async function updateTaskDetailsController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const updatedTask = await updateTaskDetailsService(
            req.params.taskId,
            req.body,
        );
        res.status(StatusCodes.OK).json(
            new SuccessResponse(
                updatedTask,
                'Task details updated successfully',
            ),
        );
    } catch (error) {
        next(error);
    }
}

export async function deleteTaskController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        await deleteTaskService(req.params.taskId);
        res.status(StatusCodes.OK).json(
            new SuccessResponse(null, 'Task deleted successfully'),
        );
    } catch (error) {
        next(error);
    }
}

export async function updateTaskStatusController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const updatedTask = await updateTaskStatusService(
            req.params.taskId,
            req.body.status,
        );
        res.status(StatusCodes.OK).json(
            new SuccessResponse(
                updatedTask,
                'Task status updated successfully',
            ),
        );
    } catch (error) {
        next(error);
    }
}
