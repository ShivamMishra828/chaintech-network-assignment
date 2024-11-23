/**
 * Custom error class for handling application-specific errors.
 * Extends the built-in Error class to include additional properties.
 */
class AppError extends Error {
    statusCode: number; // HTTP status code associated with the error
    isOperational: boolean; // Indicates if the error is operational (expected) or programming (unexpected)

    /**
     * Constructor for creating a new AppError instance.
     * @param message - The error message to be displayed.
     * @param statusCode - The HTTP status code (default is 500).
     * @param isOperational - Indicates if the error is operational (default is true).
     */
    constructor(
        message: string,
        statusCode: number = 500,
        isOperational: boolean = true,
    ) {
        super(message); // Call the parent constructor with the error message
        this.statusCode = statusCode; // Set the status code
        this.isOperational = isOperational; // Set the operational flag

        // Capture the stack trace for better debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

// Exporting the custom AppError class for use in other parts of the application
export default AppError;
