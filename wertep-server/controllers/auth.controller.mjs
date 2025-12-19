// Assume 'jwt' is the name of the cookie holding the authentication token.

// --- Existing functions (for context) ---
export const signup = (req, res) => {
    // ... signup logic
    res.status(201).json({ message: 'User registered' });
};

export const signin = (req, res) => {
    // ... signin logic, which sets the cookie
    res.cookie('jwt', 'some_token_value', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'User logged in' });
};
// ----------------------------------------


// --- New Sign-Out Function ---

/**
 * Handles the user sign-out process by clearing the session cookie.
 */
export const signout = (req, res) => {
    try {
        // Step 1: Clear the cookie named 'jwt'. 
        // This is the CRUCIAL step that invalidates the user's session.
        res.clearCookie('jwt');

        // Step 2: Send a success response.
        res.status(200).json({
            success: true,
            message: 'User logged out successfully. Session token cleared.'
        });

    } catch (error) {
        // Fallback for unexpected errors
        console.error('Signout Error:', error);
        res.status(500).json({
            success: false,
            message: 'An internal error occurred during signout.'
        });
    }
};