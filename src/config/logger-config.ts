import { createLogger, format, transports } from 'winston';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

const logFilePath = path.join(__dirname, '..', 'logs', 'server.log');

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
        ({ timestamp, level, message }) =>
            `${timestamp} [${level}]: ${message}`,
    ),
);

const logger = createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new transports.File({ filename: logFilePath }),
        new transports.Console({
            format: format.combine(format.colorize(), logFormat),
        }),
    ],
});

function requestLogger(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const startTime = Date.now();

    logger.info(`Incoming Request: ${method} ${url}`);

    res.on('finish', () => {
        const { statusCode } = res;
        const duration = Date.now() - startTime;

        const message =
            statusCode >= 400
                ? `Response: ${method} ${url} - ${statusCode} - FAILED (${duration}ms)`
                : `Response: ${method} ${url} - ${statusCode} - SUCCESS (${duration}ms)`;
        logger.info(message);
    });
    next();
}

export { logger, requestLogger };
