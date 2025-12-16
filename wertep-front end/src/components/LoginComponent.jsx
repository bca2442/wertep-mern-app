// src/components/LoginComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3000'; // Match your server.js PORT

function LoginComponent() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formMessage, setFormMessage] = useState({ text: '', color: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Effect for the "Classy Slide-Up Motion Effect"
    useEffect(() => {
        const container = document.getElementById('loginContainer');
        if (container) {
            container.classList.add('loaded');
        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        const key = id === 'loginEmail' ? 'email' : 'password'; 
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            setFormMessage({ text: 'Please enter both email and password.', color: '#FF6347' });
            return;
        }

        setFormMessage({ text: 'Logging in...', color: '#C5C6C7' });
        setIsLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                setFormMessage({ text: 'Login successful! Access granted.', color: '#66FCF1' });
                // Redirect to dashboard
                setTimeout(() => {
                    navigate('/dashboard'); 
                }, 1000);
            }
        } catch (error) {
            console.error('Login Error:', error);
            const message = error.response?.data?.message || 'Invalid credentials or server error.';
            setFormMessage({ text: message, color: '#FF6347' });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="login-container" id="loginContainer">
            <h1 className="wertep-logo">Wertep</h1>
            <h2 className="subtitle">Welcome Back!</h2> 
            
            <form onSubmit={handleLoginSubmit} id="loginForm">
                <div className="input-field-container">
                    <input 
                        type="email" 
                        id="loginEmail" 
                        placeholder="Email Address" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="password-field-container">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        id="loginPassword" 
                        placeholder="Password" 
                        required 
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                    <i 
                        className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                        id="toggleLoginPassword"
                        onClick={togglePasswordVisibility}
                    ></i>
                </div>
                
                <button 
                    type="submit" 
                    className="login-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging In...' : 'Log In'}
                </button>
            </form>

            <p className="error-message" id="formLoginMessage" style={{color: formMessage.color}}>{formMessage.text}</p>
            
            <div className="social-login">
                <p>— OR —</p>
                <button className="google-button">
                    <i className="fab fa-google"></i> Log In with Google
                </button>
            </div>

            <div className="links">
                <a href="#">Forgot Password?</a> | <a href="#">Reset Password</a>
            </div>
            
            <div className="signup-prompt">
                Don't have an account? <Link to="/">Sign Up</Link>
            </div>
        </div>
    );
}

export default LoginComponent;