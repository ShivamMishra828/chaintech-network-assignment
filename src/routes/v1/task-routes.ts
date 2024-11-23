import {
    createTaskController,
    deleteTaskController,
    fetchAllTasksController,
    fetchTaskByIdController,
    updateTaskDetailsController,
    updateTaskStatusController,
} from '../../controllers/task-controller';
import {
    validateIncomingRequest,
    validateIncomingUpdateDetailsRequest,
    validateIncomingUpdateStatusRequest,
    validateTaskId,
} from '../../middlewares/task-validation-middleware';
import express, { Router } from 'express';

// Create a new Router instance
const router: Router = express.Router();

// Create a new task (HTTP POST '/')
router.post('/', validateIncomingRequest, createTaskController);

// Fetch all tasks (HTTP GET '/')
router.get('/', fetchAllTasksController);

// Fetch a task by ID (HTTP GET '/:taskId')
router.get('/:taskId', validateTaskId, fetchTaskByIdController);

// Update task details (HTTP PUT '/:taskId')
router.put(
    '/:taskId',
    validateIncomingUpdateDetailsRequest,
    updateTaskDetailsController,
);

// Delete a task (HTTP DELETE '/:taskId')
router.delete('/:taskId', deleteTaskController);

// Update task status (HTTP PATCH '/:taskId')
router.patch(
    '/:taskId',
    validateIncomingUpdateStatusRequest,
    updateTaskStatusController,
);

export default router;
