import { createLogger, format, transports } from 'winston';
import path from 'path';

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

export default logger;
