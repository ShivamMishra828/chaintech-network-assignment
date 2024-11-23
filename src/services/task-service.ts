import { logger } from '../config/logger-config'; // Import logger for logging messages
import { ITask } from '../models/task-model'; // Import the ITask interface
import TaskRepository from '../repository/task-repository'; // Import the Task repository
import AppError from '../utils/app-error'; // Import custom error handling class
import { StatusCodes } from 'http-status-codes'; // Import HTTP status codes

const taskRepository = new TaskRepository(); // Instantiate the Task repository

/**
 * Service to create a new task.
 * @param taskData - The data for the new task, which can be partial.
 * @returns The created task.
 * @throws AppError if the task cannot be created.
 */
export async function createTaskService(
    taskData: Partial<ITask>,
): Promise<ITask> {
    try {
        // Prevent creation of a task with a completed status
        if (taskData.status === 'completed') {
            logger.error("Task with completed status can't be created");
            throw new AppError(
                'Task cannot be created with a completed status',
                StatusCodes.BAD_REQUEST,
            );
        }
        const task = await taskRepository.create(taskData); // Create the task
        logger.info(
            `New Task created with id: ${task._id} successfully created.`,
        );
        return task; // Return the created task
    } catch (error) {
        if (error instanceof AppError) {
            throw error; // Rethrow known application errors
        }
        logger.error('Something went wrong while creating a new task');
        throw new AppError(
            'An unexpected error occurred while creating a new task',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

/**
 * Service to fetch all tasks.
 * @returns An array of tasks.
 * @throws AppError if an error occurs while fetching tasks.
 */
export async function fetchAllTasksService(): Promise<ITask[]> {
    try {
        const tasks = await taskRepository.findAll(); // Retrieve all tasks
        logger.info(`${tasks.length} tasks fetched successfully`);
        return tasks; // Return the list of tasks
    } catch (error) {
        logger.error('Something went wrong while fetching all tasks');
        throw new AppError(
            'An unexpected error occurred while fetching all tasks',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

/**
 * Service to fetch a specific task by its ID.
 * @param taskId - The ID of the task to fetch.
 * @returns The found task or null if not found.
 * @throws AppError if the task is not found or an error occurs.
 */
export async function fetchTaskByIdService(
    taskId: string,
): Promise<ITask | null> {
    try {
        const task = await taskRepository.findById(taskId); // Find the task by ID
        if (!task) {
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }
        return task; // Return the found task
    } catch (error) {
        if (error instanceof AppError) {
            throw error; // Rethrow known application errors
        }
        logger.error('Error fetching task by ID');
        throw new AppError(
            'An unexpected error occurred while fetching the task by ID',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

/**
 * Service to update details of a specific task by its ID.
 * @param taskId - The ID of the task to update.
 * @param updatedData - The data to update in the task.
 * @returns The updated task or null if not found.
 * @throws AppError if the task is not found or an error occurs during update.
 */
export async function updateTaskDetailsService(
    taskId: string,
    updatedData: Partial<Pick<ITask, 'description' | 'category' | 'dueDate'>>,
): Promise<ITask | null> {
    try {
        const task = await taskRepository.update(taskId, updatedData); // Update the task
        if (!task) {
            logger.error(`Task with id: ${taskId} doesn't exist`);
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }

        logger.info(`Task with id: ${task._id} successfully updated`);
        return task; // Return the updated task
    } catch (error) {
        if (error instanceof AppError) {
            throw error; // Rethrow known application errors
        }

        logger.error(`Error updating task with id: ${taskId}`);
        throw new AppError(
            'An unexpected error occurred while updating the task',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

/**
 * Service to delete a specific task by its ID.
 * @param taskId - The ID of the task to delete.
 * @throws AppError if the task is not found or an error occurs during deletion.
 */
export async function deleteTaskService(taskId: string): Promise<void> {
    try {
        const task = await taskRepository.delete(taskId); // Delete the specified task
        if (!task) {
            logger.error(`Task with id: ${taskId} doesn't exist`);
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }
        logger.info(`Task with id: ${taskId} successfully deleted`);
    } catch (error) {
        if (error instanceof AppError) {
            throw error; // Rethrow known application errors
        }
        logger.error(`Error deleting task with id: ${taskId}`);
        throw new AppError(
            'An unexpected error occurred while deleting the task',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

/**
 * Service to update the status of a specific task by its ID.
 * @param taskId - The ID of the task to update.
 * @param status - The new status for the task.
 * @returns The updated task.
 * @throws AppError if the status is invalid or an error occurs during update.
 */
export async function updateTaskStatusService(
    taskId: string,
    status: string,
): Promise<ITask> {
    try {
        const task = await taskRepository.findById(taskId); // Find the specified task
        if (!task) {
            logger.error(`Task with id: ${taskId} doesn't exist`);
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }

        // Check for invalid status transitions
        if (task.status === 'completed' && status === 'completed') {
            logger.error(
                `Task with id: ${taskId} is already marked as completed`,
            );
            throw new AppError(
                'Task is already completed',
                StatusCodes.BAD_REQUEST,
            );
        }

        if (task.status === 'pending' && status === 'pending') {
            logger.error(
                `Task with id: ${taskId} is already marked as pending`,
            );
            throw new AppError(
                'Task is already pending',
                StatusCodes.BAD_REQUEST,
            );
        }

        // Update and save the new status
        task.status = status;
        await task.save();

        logger.info(`Task status with id: ${taskId} updated successfully`);
        return task; // Return the updated task
    } catch (error) {
        if (error instanceof AppError) {
            throw error; // Rethrow known application errors
        }

        logger.error(`Error updating task status with id: ${taskId}`);
        throw new AppError(
            'An unexpected error occurred while updating the task status',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}
