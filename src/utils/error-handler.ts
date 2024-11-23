import { logger } from '@config/logger-config'; // Import the logger for logging error messages
import { NextFunction, Request, Response } from 'express'; // Import types from express
import AppError from './app-error'; // Import the custom AppError class
import { ErrorResponse } from './responses'; // Import the ErrorResponse utility for consistent error responses
import { StatusCodes } from 'http-status-codes'; // Import HTTP status codes

/**
 * Global error handling middleware for Express applications.
 * Logs the error and sends a structured response to the client.
 * @param err - The error object that was thrown.
 * @param req - The request object.
 * @param res - The response object to send the result.
 * @param next - The next middleware function in the stack.
 */
function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // Log the error message
    logger.error(`Error: ${err.message}`);

    // Check if the error is an instance of AppError
    if (err instanceof AppError) {
        // Send a structured response with the specific status code and message
        res.status(err.statusCode).json(new ErrorResponse(err, err.message));
    }

    // For other errors, send a generic internal server error response
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        new ErrorResponse(err, 'Internal Server Error'),
    );
}

// Exporting the global error handler for use in other parts of the application
export default globalErrorHandler;
