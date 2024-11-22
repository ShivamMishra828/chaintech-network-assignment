import dotenv from 'dotenv';

dotenv.config();

export const ServerConfig = {
    PORT: parseInt(process.env.PORT || '3000'),
    RATE_LIMIT_WINDOW_MS: parseInt(
        process.env.RATE_LIMIT_WINDOW_MS || '600000',
    ),
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '20'),
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
    DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://localhost:27017/task-db',
};
