import { logger } from '../config/logger-config';
import { ServerConfig } from '../config/server-config';
import mongoose from 'mongoose';

// Establish a connection to the MongoDB database
async function connectToDB() {
    try {
        // Attempt to connect to the database using the configured URL
        const connectionInstance = await mongoose.connect(
            ServerConfig.DATABASE_URL,
        );

        // Log success message with host information
        logger.info(
            `MongoDB Connected Successfully || Host: ${connectionInstance.connection.host}`,
        );
    } catch (error) {
        // Log error message and re-throw the error
        logger.error(`MongoDB Connection Failed || Error: ${error}`);
        throw error;
    }
}

// Close the database connection gracefully
async function closeDBConnection() {
    try {
        // Attempt to close the existing Mongoose Connection
        await mongoose.connection.close();

        // Log success message indicating the connection is closed
        logger.info('MongoDB Connection Closed Gracefully');
    } catch (error) {
        // Log an error if closing the connection fails
        logger.error(`Error closing MongoDB connection: ${error}`);
    }
}

export { connectToDB, closeDBConnection };
