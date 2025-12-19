import React, { useState } from 'react';

export default function SignUp() {
  // State to hold form data and track loading/error states
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle changes in form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading state
      
      // 1. Send data to the backend API endpoint
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      // 2. Handle server errors
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      // 3. Success! Reset states and show message (or navigate later)
      setLoading(false);
      setError(null);
      // **TO DO**: Add navigation to the Sign In page here after success
      
    } catch (error) {
      setLoading(false);
      setError(error.message); // Handle network/client-side errors
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* Username Input */}
        <input 
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        
        {/* Email Input */}
        <input 
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        
        {/* Password Input */}
        <input 
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        
        {/* Submit Button */}
        <button
          disabled={loading} // Disable button while loading
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      
      {/* Link to Sign In Page */}
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        {/* **TO DO**: Replace with <Link> component later */}
        <span className='text-blue-700'>Sign in</span> 
      </div>
      
      {/* Display Error Message */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}