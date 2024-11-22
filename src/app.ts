import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ServerConfig } from '@config/server-config';
import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';
import { requestLogger } from '@config/logger-config';
import globalErrorHandler from '@utils/error-handler';

const app: Application = express();

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: ServerConfig.RATE_LIMIT_WINDOW_MS,
    limit: ServerConfig.RATE_LIMIT_MAX,
    message: 'Too many requests, try again after 10 minutes',
});

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(requestLogger);
app.use(
    cors({
        origin: [ServerConfig.CORS_ORIGIN],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }),
);

app.get('/status', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Server is up and running smoothly!',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date(Date.now()).toUTCString(),
    });
});

app.use(globalErrorHandler);

export default app;
