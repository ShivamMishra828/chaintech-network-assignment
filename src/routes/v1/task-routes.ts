import {
    createTaskController,
    fetchAllTasksController,
} from '@controllers/task-controller';
import { validateIncomingRequest } from '@middlewares/task-validation-middleware';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/', validateIncomingRequest, createTaskController);
router.get('/', fetchAllTasksController);

export default router;
