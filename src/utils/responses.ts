/**
 * Base class for standard API responses.
 */
class BaseResponse {
    success: boolean; // Indicates whether the request was successful
    message: string; // Message providing additional information about the response

    /**
     * Constructor for creating a base response.
     * @param success - Indicates if the operation was successful.
     * @param message - A message providing details about the response.
     */
    constructor(success: boolean, message: string) {
        this.success = success; // Set the success flag
        this.message = message; // Set the message
    }
}

/**
 * Class for successful API responses.
 * Extends BaseResponse to include additional data.
 */
export class SuccessResponse<T> extends BaseResponse {
    data?: T; // Optional data returned in the response

    /**
     * Constructor for creating a successful response.
     * @param data - The data to include in the response (optional).
     * @param message - A message providing details about the successful operation (default is 'Successfully completed the request').
     */
    constructor(
        data?: T,
        message: string = 'Successfully completed the request',
    ) {
        super(true, message); // Call the parent constructor with success flag set to true
        this.data = data; // Set the data
    }
}

/**
 * Class for error API responses.
 * Extends BaseResponse to include additional error information.
 */
export class ErrorResponse<T> extends BaseResponse {
    error?: T; // Optional error details returned in the response

    /**
     * Constructor for creating an error response.
     * @param error - The error details to include in the response (optional).
     * @param message - A message providing details about the error (default is 'Something went wrong').
     */
    constructor(error?: T, message: string = 'Something went wrong') {
        super(false, message); // Call the parent constructor with success flag set to false
        this.error = error; // Set the error details
    }
}
