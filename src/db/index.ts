import { logger } from '@config/logger-config';
import { ServerConfig } from '@config/server-config';
import mongoose from 'mongoose';

async function connectToDB() {
    try {
        const connectionInstance = await mongoose.connect(
            ServerConfig.DATABASE_URL,
        );
        logger.info(
            `MongoDB Connected Successfully || Host: ${connectionInstance.connection.host}`,
        );
    } catch (error) {
        logger.error(`MongoDB Connection Failed || Error: ${error}`);
        throw error;
    }
}

async function closeDBConnection() {
    try {
        await mongoose.connection.close();
        logger.info('MongoDB Connection Closed Gracefully');
    } catch (error) {
        logger.error(`Error closing MongoDB connection: ${error}`);
    }
}

export { connectToDB, closeDBConnection };
