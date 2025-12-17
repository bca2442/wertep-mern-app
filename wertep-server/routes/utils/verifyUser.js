import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    // 1. Get the token from the request cookies
    const token = req.cookies.access_token;

    // 2. Check if the token exists
    if (!token) return next(errorHandler(401, 'Unauthorized: No token provided'));

    // 3. Verify the token
    // Uses the JWT_SECRET from your .env file
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden: Invalid token'));

        // 4. If verification is successful, attach the user info to the request object
        req.user = user;
        
        // 5. Continue to the next middleware or controller function
        next();
    });
};