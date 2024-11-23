import { createLogger, format, transports } from 'winston';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

// Define the path for the log file
const logFilePath = path.join(__dirname, '..', 'logs', 'server.log');

// Define the log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add a timestamp to each log entry
    format.printf(
        ({ timestamp, level, message }) =>
            `${timestamp} [${level}]: ${message}`, // Format the log output
    ),
);

// Create a logger instance with the file and console transports
const logger = createLogger({
    level: 'info', // Default logging level
    format: logFormat, // Use the defined log format
    transports: [
        new transports.File({ filename: logFilePath }), // Log to a file
        new transports.Console({
            format: format.combine(format.colorize(), logFormat),
        }), // Log to the console
    ],
});

// Middleware to log incoming requests and responses
function requestLogger(req: Request, res: Response, next: NextFunction) {
    // Extract HTTP method and url from the request
    const { method, url } = req;

    // Record the start time of the request
    const startTime = Date.now();

    // Log the incoming request
    logger.info(`Incoming Request: ${method} ${url}`);

    // Listen for the response `finish` event to log the response details
    res.on('finish', () => {
        const { statusCode } = res; // Extract status code from the response
        const duration = Date.now() - startTime; // Calculate the request duration

        // Construct the log message
        const message =
            statusCode >= 400
                ? `Response: ${method} ${url} - ${statusCode} - FAILED (${duration}ms)`
                : `Response: ${method} ${url} - ${statusCode} - SUCCESS (${duration}ms)`;

        // Log the response with appropriate level
        logger.info(message);
    });

    // Pass control to the next middleware
    next();
}

export { logger, requestLogger };
