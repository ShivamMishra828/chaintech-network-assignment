import {
    createTaskController,
    fetchAllTasksController,
    fetchTaskByIdController,
} from '@controllers/task-controller';
import {
    validateIncomingRequest,
    validateTaskId,
} from '@middlewares/task-validation-middleware';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/', validateIncomingRequest, createTaskController);
router.get('/', fetchAllTasksController);
router.get('/:taskId', validateTaskId, fetchTaskByIdController);

export default router;
