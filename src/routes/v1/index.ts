import express, { Router } from 'express';
import taskRoutes from './task-routes';

// Create a new Router instance
const router: Router = express.Router();

// Use the taskRoutes for any routes that start with '/tasks'
router.use('/tasks', taskRoutes);

export default router;
