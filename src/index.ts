import app from './app';
import { closeDBConnection, connectToDB } from './db';
import { ServerConfig } from '@config/server-config';
import logger from '@config/logger-config';

let server: ReturnType<typeof app.listen>;

async function startServer(): Promise<void> {
    try {
        await connectToDB();
        server = app.listen(ServerConfig.PORT, () => {
            logger.info(
                `Server started listening on http://localhost:${ServerConfig.PORT}`,
            );
        });
    } catch (error) {
        logger.error(`Error starting the server: ${error}`);
        process.exit(1);
    }
}

async function shutdownServer(): Promise<void> {
    logger.info('Shutting down server...');
    server?.close((err) => {
        if (err) {
            logger.error(`Error while shutting down server: ${err}`);
            process.exit(1);
        }
        logger.info('HTTP server closed gracefully');
    });

    await closeDBConnection();
    process.exit(0);
}

process.on('SIGINT', async () => {
    logger.info('Received SIGINT Signal');
    await shutdownServer();
});

process.on('SIGTERM', async () => {
    logger.info('Received SIGTERM Signal');
    await shutdownServer();
});

process.on('uncaughtException', (error) => {
    logger.info(`Uncaught Exception: ${error}`);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    logger.info(`Unhandled Rejection: ${error}`);
    process.exit(1);
});

startServer();
