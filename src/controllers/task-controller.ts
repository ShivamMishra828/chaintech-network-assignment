import {
    createTaskService,
    deleteTaskService,
    fetchAllTasksService,
    fetchTaskByIdService,
    updateTaskDetailsService,
    updateTaskStatusService,
} from '../services/task-service';
import { SuccessResponse } from '../utils/responses';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Controller to handle task creation
export async function createTaskController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Call service to create a task with request body data
        const task = await createTaskService(req.body);

        // Send a success response with the created task
        res.status(StatusCodes.CREATED).json(
            new SuccessResponse(task, 'Task created successfully'),
        );
    } catch (error) {
        // Pass error to the global error handler
        next(error);
    }
}

// Controller to fetch all tasks
export async function fetchAllTasksController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Call service to fetch all tasks
        const tasks = await fetchAllTasksService();

        // Send a success response with the list of tasks
        res.status(StatusCodes.OK).json(
            new SuccessResponse(tasks, 'Tasks fetched successfully'),
        );
    } catch (error) {
        // Pass error to the global error handler
        next(error);
    }
}

// Controller to fetch a task by its ID
export async function fetchTaskByIdController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Extract task ID from the request params
        const { taskId } = req.params;

        // Call service to fetch task details by ID
        const task = await fetchTaskByIdService(taskId);

        // Send a success response with the fetched task
        res.status(StatusCodes.OK).json(
            new SuccessResponse(task, 'Task fetched successfully'),
        );
    } catch (error) {
        // Pass error to the global error handler
        next(error);
    }
}

// Controller to update task details
export async function updateTaskDetailsController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Extract task ID from the request params
        const { taskId } = req.params;

        // Call service to update task details with the new data
        const updatedTask = await updateTaskDetailsService(taskId, req.body);

        // Send success response with the updated task
        res.status(StatusCodes.OK).json(
            new SuccessResponse(
                updatedTask,
                'Task details updated successfully',
            ),
        );
    } catch (error) {
        // Pass error to the global error handler
        next(error);
    }
}

// Controller to delete a task
export async function deleteTaskController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Extract task ID from the request params
        const { taskId } = req.params;

        // Call service to delete the task
        await deleteTaskService(taskId);

        // Send a success response indicating the task was deleted
        res.status(StatusCodes.NO_CONTENT).json(
            new SuccessResponse(null, 'Task deleted successfully'),
        );
    } catch (error) {
        // Pass error to the global error handler
        next(error);
    }
}

// Controller to update task status
export async function updateTaskStatusController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Extract task ID from the request params
        const { taskId } = req.params;

        // Extract status from the request.body
        const { status } = req.body;

        // Call service to update the status of the task
        const updatedTask = await updateTaskStatusService(taskId, status);

        // Send a success response with the updated task
        res.status(StatusCodes.OK).json(
            new SuccessResponse(
                updatedTask,
                'Task status updated successfully',
            ),
        );
    } catch (error) {
        // Pass error to the global error handler
        next(error);
    }
}
