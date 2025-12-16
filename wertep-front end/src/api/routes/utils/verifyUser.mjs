import jwt from 'jsonwebtoken';

// --- JWT Secret Key ---
// NOTE: This MUST match the secret key used when signing (creating) the token during sign-in.
// In a real application, this should be loaded from environment variables (process.env.JWT_SECRET).
const JWT_SECRET = 'YOUR_JWT_SECRET'; 


// --- Basic Custom Error Handler (Needed for clean error responses) ---
// This simple function creates an error object with a status code and message.
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
// --------------------------------------------------------------------


/**
 * Middleware function to verify the user's JWT token stored in a cookie.
 * * @param {object} req - The request object (should contain cookies).
 * @param {object} res - The response object.
 * @param {function} next - The function to call to move to the next middleware/controller.
 */
export const verifyUser = (req, res, next) => {
    // 1. EXTRACT TOKEN: Get the token from the cookie named 'jwt'
    const token = req.cookies.jwt; 
    
    // 1.1. CHECK PRESENCE: If the token doesn't exist, the user is not authenticated.
    if (!token) {
        // HTTP 401: Unauthorized - User must log in
        return next(errorHandler(401, 'Unauthorized: No authentication token found. Please sign in.'));
    }

    // 2. VERIFY TOKEN: Use the JWT library to decode and verify the token's signature.
    jwt.verify(token, JWT_SECRET, (err, user) => {
        
        // 2.1. CHECK VALIDITY: If verification fails (e.g., signature invalid, token expired).
        if (err) {
            // HTTP 403: Forbidden - Token exists but is invalid/expired
            return next(errorHandler(403, 'Forbidden: Invalid or expired token.'));
        }

        // 3. ATTACH DATA: If successful, the 'user' object contains the payload 
        // that was originally encoded into the token (e.g., user ID, username).
        // Attach this payload to the request for subsequent controller use.
        req.user = user; 
        
        // 4. CONTINUE: Call 'next()' to pass control to the next function in the chain (the controller).
        next(); 
    });
};