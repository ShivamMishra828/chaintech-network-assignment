import {
    createTaskController,
    deleteTaskController,
    fetchAllTasksController,
    fetchTaskByIdController,
    updateTaskDetailsController,
    updateTaskStatusController,
} from '@controllers/task-controller';
import {
    validateIncomingRequest,
    validateIncomingUpdateDetailsRequest,
    validateIncomingUpdateStatusRequest,
    validateTaskId,
} from '@middlewares/task-validation-middleware';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/', validateIncomingRequest, createTaskController);
router.get('/', fetchAllTasksController);
router.get('/:taskId', validateTaskId, fetchTaskByIdController);
router.put(
    '/:taskId',
    validateIncomingUpdateDetailsRequest,
    updateTaskDetailsController,
);
router.delete('/:taskId', deleteTaskController);
router.patch(
    '/:taskId',
    validateIncomingUpdateStatusRequest,
    updateTaskStatusController,
);

export default router;
