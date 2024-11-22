import { logger } from '@config/logger-config';
import { NextFunction, Request, Response } from 'express';
import AppError from './app-error';
import { ErrorResponse } from './responses';
import { StatusCodes } from 'http-status-codes';

function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    logger.error(`Error: ${err.message}`);
    if (err instanceof AppError) {
        res.status(err.statusCode).json(new ErrorResponse(err, err.message));
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        new ErrorResponse(err, 'Internal Server Error'),
    );
}

export default globalErrorHandler;
