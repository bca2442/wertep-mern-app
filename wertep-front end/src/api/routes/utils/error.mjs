export const errorHandler = (statusCode, message) => {
    // 1. Create a native JavaScript Error object.
    const error = new Error();
    
    // 2. Attach custom properties (statusCode and message) to the error object.
    // This allows the error handling middleware in index.mjs to read this information.
    error.statusCode = statusCode;
    error.message = message;
    
    // 3. Return the enhanced error object.
    return error;
};