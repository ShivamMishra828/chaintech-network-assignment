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
        const task = await taskRepository.create(taskData);
        logger.info(
            `New Task created with id: ${task._id} successfully created.`,
        );
        return task;
    } catch (error) {
        logger.error('Something went wrong while creating a new task');
        throw new AppError(
            'An unexpected error occured while creating a new task',
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }
}
