import { logger } from '@config/logger-config';
import { ITask } from '@models/task-model';
import TaskRepository from '@repository/task-repository';
import AppError from '@utils/app-error';
import { StatusCodes } from 'http-status-codes';

const taskRepository = new TaskRepository();

export async function createTaskService(
    taskData: Partial<ITask>,
): Promise<ITask> {
    try {
        if (taskData.status === 'completed') {
            logger.error("Task with completed status can't be created");
            throw new AppError(
                'Task cannot be created with a completed status',
                StatusCodes.BAD_REQUEST,
            );
        }
        const task = await taskRepository.create(taskData);
        logger.info(
            `New Task created with id: ${task._id} successfully created.`,
        );
        return task;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        logger.error('Something went wrong while creating a new task');
        throw new AppError(
            'An unexpected error occured while creating a new task',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export async function fetchAllTasksService(): Promise<ITask[]> {
    try {
        const tasks = await taskRepository.findAll();
        logger.info(`${tasks.length} tasks fetched successfully`);
        return tasks;
    } catch (error) {
        logger.error('Something went wrong while fetching all tasks');
        throw new AppError(
            'An unexpected error occured while fetching all tasks',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export async function fetchTaskByIdService(
    taskId: string,
): Promise<ITask | null> {
    try {
        const task = await taskRepository.findById(taskId);
        if (!task) {
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }
        return task;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        logger.error('Error fetching task by ID');
        throw new AppError(
            'An unexpected error occurred while fetching task by id',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export async function updateTaskDetailsService(
    taskId: string,
    updatedData: Partial<Pick<ITask, 'description' | 'category' | 'dueDate'>>,
): Promise<ITask | null> {
    try {
        const task = await taskRepository.update(taskId, updatedData);
        if (!task) {
            logger.error(`Task with id: ${taskId} doesn't exists`);
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }

        logger.info(`Task with id: ${task._id} successfully updated`);
        return task;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        logger.error(`Error updating task with id: ${taskId}`);
        throw new AppError(
            'An unexpected error occurred while updating the task',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}

export async function deleteTaskService(taskId: string): Promise<void> {
    try {
        const task = await taskRepository.delete(taskId);
        if (!task) {
            logger.error(`Task with id: ${taskId} doesn't exists`);
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }
        logger.info(`Task with id: ${taskId} successfully deleted`);
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        logger.error(`Error deleting task with id: ${taskId}`);
        throw new AppError(
            'An unexpected error occurred while deleting the task',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}
