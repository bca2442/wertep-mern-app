import User from '../models/user.model.mjs'; // Import the model for database interaction
import bcryptjs from 'bcryptjs'; // For hashing passwords

// --- Existing Test Function ---
export const test = (req, res) => {
    res.json({ message: 'API is working!' });
};


// --- New Get User Profile Function (Protected Read Operation) ---

/**
 * Controller function to fetch the user's profile.
 * This function will only run AFTER the verifyUser middleware succeeds,
 * meaning req.user will contain the decoded token payload.
 */
export const getUserProfile = async (req, res, next) => {
    // 1. Get the user ID from the authenticated token payload
    const userId = req.user.id; 
    
    try {
        // 2. Query the database to find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            // If for some reason the user is not found (shouldn't happen if token is fresh)
            return next(errorHandler(404, 'User not found in database.'));
        }

        // 3. Remove the sensitive password field before sending the response
        const { password, ...rest } = user._doc;

        // 4. Send the user data
        res.status(200).json(rest);

    } catch (error) {
        // Pass any database or server error to the error handler middleware
        next(error);
    }
};


// --- Existing Update User Function (Protected Write Operation) ---

/**
 * Function to handle updating a user's profile.
 * NOTE: For production, you MUST ensure req.user.id matches req.params.id for security.
 */
export const updateUser = async (req, res, next) => {
    // The security check to ensure a user only updates their own account:
    if (req.user.id !== req.params.id) {
        // You would use your custom error handler here (assuming it's available)
        return next(errorHandler(401, 'You can only update your own account!')); 
    }

    if (req.body.password) {
        // Only hash the password if the user is changing it
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    try {
        // Mongoose findByIdAndUpdate method
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                // $set ensures only the fields provided in the body are updated
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true } // Returns the new, updated document
        );

        // Remove the password from the response object
        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};