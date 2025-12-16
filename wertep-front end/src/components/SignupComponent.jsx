// src/components/SignupComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3000'; // Match your server.js PORT

function SignupComponent() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        otp: '',
    });
    const [formMessage, setFormMessage] = useState({ text: '', color: '' });
    const [otpSent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Effect for the "Classy Slide-Up Motion Effect"
    useEffect(() => {
        const container = document.getElementById('signupContainer');
        if (container) {
            container.classList.add('loaded');
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSendOtp = async () => {
        const { email, phone, password } = formData;

        if (!email || !phone || !password) {
            setFormMessage({ text: 'Please fill in all fields (Email, Password, Phone).', color: '#FF6347' });
            return;
        }

        setFormMessage({ text: 'Sending OTP to mobile...', color: '#C5C6C7' });
        setIsLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/send-otp`, {
                email,
                phone,
                password,
            });

            if (response.status === 200) {
                setFormMessage({ text: 'OTP sent successfully to your mobile number! Check your phone.', color: '#66FCF1' });
                setOtpSent(true);
            }
        } catch (error) {
            console.error('OTP Send Error:', error);
            const message = error.response?.data?.message || 'Error sending OTP. Please check your network and phone number format.';
            setFormMessage({ text: message, color: '#FF6347' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (!otpSent) {
            setFormMessage({ text: 'Please click "Send OTP" first.', color: '#FF6347' });
            return;
        }

        const { email, otp } = formData;
        
        if (otp.length !== 6) {
             setFormMessage({ text: 'Please enter the 6-digit OTP.', color: '#FF6347' });
            return;
        }


        setFormMessage({ text: 'Verifying OTP and completing sign up...', color: '#C5C6C7' });
        setIsLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/verify-and-signup`, {
                email,
                otp,
            });

            if (response.status === 201) {
                setFormMessage({ text: 'Sign Up Successful! Redirecting to dashboard...', color: '#66FCF1' });
                e.target.reset(); // Use e.target.reset() to clear the form fields
                
                // Redirect to the dashboard
                setTimeout(() => {
                    navigate('/dashboard'); 
                }, 1000);
            }
        } catch (error) {
            console.error('Sign Up Error:', error);
            const message = error.response?.data?.message || 'Verification failed. Invalid OTP or server error.';
            setFormMessage({ text: message, color: '#FF6347' });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="login-container" id="signupContainer">
            <h1 className="wertep-logo">Wertep</h1>
            
            <form onSubmit={handleSignupSubmit} id="signupForm">
                <div className="input-field-container">
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Email Address" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={otpSent && !isLoading}
                    />
                </div>

                <div className="password-field-container">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        id="password" 
                        placeholder="Password" 
                        required 
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={otpSent && !isLoading}
                    />
                    <i 
                        className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                        id="togglePassword"
                        onClick={togglePasswordVisibility}
                    ></i>
                </div>
                
                <div className="input-field-container">
                    <input 
                        type="tel" 
                        id="phone" 
                        placeholder="Mobile Phone Number (e.g., +12015550123)" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={otpSent && !isLoading}
                    />
                </div>

                <div id="otpSection" className={otpSent ? '' : 'hidden'}>
                    <input 
                        type="text" 
                        id="otp" 
                        placeholder="Enter OTP" 
                        maxLength="6" 
                        required 
                        value={formData.otp}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                    <button 
                        type="button" 
                        className="resend-link" 
                        id="resendOtp"
                        onClick={handleSendOtp}
                        disabled={isLoading}
                    >
                        {isLoading && otpSent ? 'Resending...' : 'Resend OTP'}
                    </button>
                </div>
                
                <button 
                    type="button" 
                    className={`login-button ${otpSent ? 'hidden' : ''}`} 
                    id="sendOtpButton"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                >
                    {isLoading && !otpSent ? 'Sending...' : 'Send OTP'}
                </button>

                <button 
                    type="submit" 
                    className={`login-button ${otpSent ? '' : 'hidden'}`} 
                    id="signupButton"
                    disabled={isLoading}
                >
                    {isLoading && otpSent ? 'Sign Up...' : 'Sign Up'}
                </button>
            </form>

            <p className="error-message" id="formMessage" style={{color: formMessage.color}}>{formMessage.text}</p>
            
            <div className="social-login">
                <p>— OR —</p>
                <button className="google-button">
                    <i className="fab fa-google"></i> Sign Up with Google
                </button>
            </div>

            <div className="links">
                <a href="#">Forgot Password?</a> | <a href="#">Reset Password</a>
            </div>
            
            <div className="signup-prompt">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    );
}

export default SignupComponent;