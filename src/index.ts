import app from './app'; // Import the Express application
import { closeDBConnection, connectToDB } from './db'; // Import database connection functions
import { ServerConfig } from '@config/server-config'; // Import server configuration settings
import { logger } from '@config/logger-config'; // Import logger for logging messages

let server: ReturnType<typeof app.listen>; // Variable to hold the server instance

/**
 * Function to start the server.
 * Connects to the database and starts listening on the specified port.
 */
async function startServer(): Promise<void> {
    try {
        await connectToDB(); // Establish a connection to the database
        server = app.listen(ServerConfig.PORT, () => {
            logger.info(
                `Server started listening on http://localhost:${ServerConfig.PORT}`,
            ); // Log the server start message
        });
    } catch (error) {
        logger.error(`Error starting the server: ${error}`); // Log any errors during startup
        process.exit(1); // Exit the process with an error code
    }
}

/**
 * Function to gracefully shut down the server.
 * Closes the HTTP server and database connection.
 */
async function shutdownServer(): Promise<void> {
    logger.info('Shutting down server...'); // Log shutdown initiation
    server?.close((err) => {
        if (err) {
            logger.error(`Error while shutting down server: ${err}`); // Log any errors during shutdown
            process.exit(1); // Exit with an error code if shutdown fails
        }
        logger.info('HTTP server closed gracefully'); // Log successful shutdown of the HTTP server
    });

    await closeDBConnection(); // Close the database connection
    process.exit(0); // Exit the process successfully
}

// Handle SIGINT signal (e.g., Ctrl+C)
process.on('SIGINT', async () => {
    logger.info('Received SIGINT Signal'); // Log receipt of SIGINT signal
    await shutdownServer(); // Initiate server shutdown
});

// Handle SIGTERM signal (e.g., termination request)
process.on('SIGTERM', async () => {
    logger.info('Received SIGTERM Signal'); // Log receipt of SIGTERM signal
    await shutdownServer(); // Initiate server shutdown
});

// Handle uncaught exceptions globally
process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error}`); // Log uncaught exceptions
    process.exit(1); // Exit with an error code
});

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection: ${error}`); // Log unhandled promise rejections
    process.exit(1); // Exit with an error code
});

// Start the server when the application is run
startServer();
