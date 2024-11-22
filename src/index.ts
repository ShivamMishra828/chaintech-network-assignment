import app from './app';
import { closeDBConnection, connectToDB } from './db';
import { ServerConfig } from '@config/server-config';

let server: ReturnType<typeof app.listen>;

async function startServer(): Promise<void> {
    try {
        await connectToDB();
        server = app.listen(ServerConfig.PORT, () => {
            console.log(
                `Server started listening on http://localhost:${ServerConfig.PORT}`,
            );
        });
    } catch (error) {
        console.log(`Error starting the server: ${error}`);
        process.exit(1);
    }
}

async function shutdownServer(): Promise<void> {
    console.log('Shutting down server...');
    server?.close((err) => {
        if (err) {
            console.log(`Error while shutting down server: ${err}`);
            process.exit(1);
        }
        console.log('HTTP server closed gracefully');
    });

    await closeDBConnection();
    process.exit(0);
}

process.on('SIGINT', async () => {
    console.log('Received SIGINT Signal');
    await shutdownServer();
});

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM Signal');
    await shutdownServer();
});

process.on('uncaughtException', (error) => {
    console.log(`Uncaught Exception: ${error}`);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.log(`Unhandled Rejection: ${error}`);
    process.exit(1);
});

startServer();
