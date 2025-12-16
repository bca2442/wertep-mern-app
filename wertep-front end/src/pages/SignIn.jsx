import React, { useState } from 'react';
// Imports for Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
// Imports for routing (assuming you use React Router)
import { Link, useNavigate } from 'react-router-dom'; 

export default function SignIn() {
    // Local state for form input data
    const [formData, setFormData] = useState({});
    
    // Global state selectors: Pull loading and error from the Redux store
    const { loading, error } = useSelector((state) => state.user); 
    
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Handles changes in form inputs (email and password)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // Handles the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Dispatch Start: Set global loading state to true
            dispatch(signInStart()); 

            // 2. API Call: Send credentials to the backend
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            const data = await res.json();
            
            // 3. Handle Backend Error (e.g., wrong password, user not found)
            if (data.success === false) {
                // Dispatch Failure: Send the backend error message to Redux
                dispatch(signInFailure(data.message)); 
                return;
            }

            // 4. Dispatch Success: Update Redux state with user data
            dispatch(signInSuccess(data)); 
            
            // 5. Navigate: Redirect the user to the home/dashboard page
            navigate('/'); 

        } catch (error) {
            // 6. Handle Network Error (e.g., server is down)
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                
                <input 
                    type='email' 
                    placeholder='Email' 
                    className='border p-3 rounded-lg' 
                    id='email' 
                    onChange={handleChange}
                    required
                />
                
                <input 
                    type='password' 
                    placeholder='Password' 
                    className='border p-3 rounded-lg' 
                    id='password' 
                    onChange={handleChange}
                    required
                />
                
                {/* Button state controlled by the Redux 'loading' state */}
                <button 
                    disabled={loading} 
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Don't have an account?</p>
                {/* Link to the Sign-Up page */}
                <Link to="/sign-up" className='text-blue-700'>Sign up</Link>
            </div>

            {/* Error message display, driven by the Redux 'error' state */}
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    );
}