import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Header from "../layout/Header";
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        if (formData.email && formData.password) {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', formData);
                console.log('Login successful:', response.data);

                login(response.data.token, response.data.user);
                navigate('/');

            } catch (error) {
                console.error('Login error:', error.response?.data?.message || error.message);
                alert(error.response?.data?.message || 'Login failed. Please try again.');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    // OpenID Connect Google OAuth implementation
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // Send the OpenID Connect credential to backend for verification
            const response = await axios.post('http://localhost:5000/api/auth/google', {
                credential: credentialResponse.credential
            });

            console.log('Google OpenID Connect login successful:', response.data);
            
            // Use the login context to save authentication data
            login(response.data.token, response.data.user);
            
            // Navigate to home page
            navigate('/');
        } catch (error) {
            console.error('Google OpenID Connect login failed:', error);
            let errorMessage = 'Google login failed. Please try again.';

            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }

            alert(errorMessage);
        }
    };

    const handleGoogleError = () => {
        console.log('Google OpenID Connect login failed');
        alert('Google login failed. Please try again.');
    };

    const handleFacebookLogin = () => {
        // Handle Facebook OAuth login
        console.log('Facebook login clicked');
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background with farming theme */}
            <Header />
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
              <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#87CEEB"/>
                  <stop offset="100%" style="stop-color:#98FB98"/>
                </linearGradient>
              </defs>
              <!-- Sky -->
              <rect width="1200" height="400" fill="url(#skyGradient)"/>
              <!-- Hills -->
              <path d="M0,300 Q300,250 600,280 T1200,260 L1200,400 L0,400 Z" fill="#228B22"/>
              <path d="M0,350 Q400,300 800,320 T1200,310 L1200,400 L0,400 Z" fill="#32CD32"/>
              <!-- Fields -->
              <rect x="0" y="400" width="1200" height="400" fill="#90EE90"/>
              <!-- Field rows -->
              <g stroke="#228B22" stroke-width="2" opacity="0.3">
                <line x1="0" y1="450" x2="1200" y2="450"/>
                <line x1="0" y1="500" x2="1200" y2="500"/>
                <line x1="0" y1="550" x2="1200" y2="550"/>
                <line x1="0" y1="600" x2="1200" y2="600"/>
                <line x1="0" y1="650" x2="1200" y2="650"/>
                <line x1="0" y1="700" x2="1200" y2="700"/>
                <line x1="0" y1="750" x2="1200" y2="750"/>
              </g>
              <!-- Crops -->
              <g fill="#228B22">
                <circle cx="100" cy="480" r="8"/>
                <circle cx="150" cy="475" r="6"/>
                <circle cx="200" cy="485" r="7"/>
                <circle cx="300" cy="530" r="8"/>
                <circle cx="350" cy="525" r="6"/>
                <circle cx="400" cy="535" r="7"/>
                <circle cx="500" cy="580" r="8"/>
                <circle cx="550" cy="575" r="6"/>
                <circle cx="600" cy="585" r="7"/>
                <circle cx="700" cy="630" r="8"/>
                <circle cx="750" cy="625" r="6"/>
                <circle cx="800" cy="635" r="7"/>
                <circle cx="900" cy="680" r="8"/>
                <circle cx="950" cy="675" r="6"/>
                <circle cx="1000" cy="685" r="7"/>
              </g>
              <!-- Sun -->
              <circle cx="1000" cy="100" r="60" fill="#FFD700" opacity="0.8"/>
              <!-- Clouds -->
              <ellipse cx="200" cy="80" rx="40" ry="20" fill="white" opacity="0.7"/>
              <ellipse cx="220" cy="70" rx="35" ry="18" fill="white" opacity="0.7"/>
              <ellipse cx="800" cy="120" rx="45" ry="22" fill="white" opacity="0.6"/>
              <ellipse cx="820" cy="110" rx="40" ry="20" fill="white" opacity="0.6"/>
            </svg>
          `)}`
                }}
            />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white opacity-30 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Login Form Container */}
            <div className="relative z-10 w-full max-w-[600px] mx-auto mt-24">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                    {/* Logo and Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4 shadow-lg">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">ModGoviya</h1>
                        <p className="text-gray-600">Welcome back, farmer!</p>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white/90"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white/90"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login Buttons - OpenID Connect Implementation */}
                    <div className="space-y-3">
                        {/* Google OpenID Connect Login */}
                        <GoogleOAuthProvider clientId="683378788042-ivnm3u6vv9uuapvnu63slakp1e48fuki.apps.googleusercontent.com">
                            <div className="w-full">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    useOneTap={false}
                                    text="signin_with"
                                    shape="rectangular"
                                    size="large"
                                    width="100%"
                                    theme="outline"
                                    logo_alignment="left"
                                />
                            </div>
                        </GoogleOAuthProvider>

                        {/* Facebook Login */}
                        <button
                            type="button"
                            onClick={handleFacebookLogin}
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 bg-white/90"
                        >
                            <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="text-gray-700 font-medium">Continue with Facebook</span>
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-200"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-white/80 text-sm">
                        Empowering farmers through modern technology
                    </p>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;