import { ServerConfig } from '@config/server-config';
import mongoose from 'mongoose';

async function connectToDB() {
    try {
        const connectionInstance = await mongoose.connect(
            ServerConfig.DATABASE_URL,
        );
        console.log(
            `MongoDB Connected Successfully || Host: ${connectionInstance.connection.host}`,
        );
    } catch (error) {
        console.log(`MongoDB Connection Failed || Error: ${error}`);
        throw error;
    }
}

async function closeDBConnection() {
    try {
        await mongoose.connection.close();
        console.log('MongoDB Connection Closed Gracefully');
    } catch (error) {
        console.error(`Error closing MongoDB connection: ${error}`);
    }
}

export { connectToDB, closeDBConnection };
