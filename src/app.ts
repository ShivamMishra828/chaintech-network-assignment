import express, { Application, Request, Response } from 'express'; // Import necessary modules from express
import cors from 'cors'; // Import CORS middleware for handling cross-origin requests
import { ServerConfig } from '@config/server-config'; // Import server configuration settings
import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit'; // Import rate limiting middleware
import { StatusCodes } from 'http-status-codes'; // Import HTTP status codes
import { requestLogger } from '@config/logger-config'; // Import request logging middleware
import globalErrorHandler from '@utils/error-handler'; // Import global error handling middleware
import apiRoutes from '@routes/index'; // Import API routes

// Create an instance of an Express application
const app: Application = express();

// Configure rate limiting middleware
const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: ServerConfig.RATE_LIMIT_WINDOW_MS, // Time window for rate limiting
    limit: ServerConfig.RATE_LIMIT_MAX, // Maximum number of requests allowed within the time window
    message: 'Too many requests, try again after 10 minutes', // Message sent when limit is exceeded
});

// Middleware to parse JSON requests with a size limit of 10kb
app.use(express.json({ limit: '10kb' }));
// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Apply the rate limiting middleware
app.use(limiter);

// Apply the request logging middleware
app.use(requestLogger);

// Configure CORS middleware to allow cross-origin requests
app.use(
    cors({
        origin: [ServerConfig.CORS_ORIGIN], // Allowed origin(s) for CORS requests
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
    }),
);

// Health check endpoint to verify server status
app.get('/status', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Server is up and running smoothly!',
        uptime: process.uptime(), // Server uptime in seconds
        memoryUsage: process.memoryUsage(), // Memory usage statistics
        timestamp: new Date(Date.now()).toUTCString(), // Current timestamp in UTC format
    });
});

// Use API routes under the /api prefix
app.use('/api', apiRoutes);

// Global error handling middleware
app.use(globalErrorHandler);

// Export the configured Express application for use in other parts of the application
export default app;
