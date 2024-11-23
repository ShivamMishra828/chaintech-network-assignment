import express, { Router } from 'express';
import v1Routes from './v1';

// Create a new Router instance
const router: Router = express.Router();

// Use the v1Routes for any routes that start with '/v1'
router.use('/v1', v1Routes);

export default router;
