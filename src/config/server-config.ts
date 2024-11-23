import dotenv from 'dotenv';

// Loads environment variables into process.env
dotenv.config();

// Export a configuration object with essential server settings
export const ServerConfig = {
    // Port number for the server to listen on, default to 3000 if not specified
    PORT: parseInt(process.env.PORT || '3000'),

    // Rate limit window duration in milliseconds, default to 10 minutes
    RATE_LIMIT_WINDOW_MS: parseInt(
        process.env.RATE_LIMIT_WINDOW_MS || '600000',
    ),

    // Maximum number of requests allowed in the rate limit window, default to 20
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '20'),

    // Allowed origins for CORS, default to localhost
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',

    // Datebase connection string, default to a local MongoDB instance
    DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://localhost:27017/task-db',
};
