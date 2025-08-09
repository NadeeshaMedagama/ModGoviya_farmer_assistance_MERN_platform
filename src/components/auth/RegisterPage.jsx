import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin, Sprout, Globe } from 'lucide-react';
import Header from "../layout/Header";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        location: '',
        farmingType: '',
        language: ''
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // Initialize Facebook SDK
    useEffect(() => {
        // Load Facebook SDK
        const loadFacebookSDK = () => {
            if (window.FB) return;

            window.fbAsyncInit = function() {
                window.FB.init({
                    appId: process.env.REACT_APP_FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
                    cookie: true,
                    xfbml: true,
                    version: 'v18.0'
                });
            };

            // Load Facebook SDK script
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        };

        loadFacebookSDK();
    }, []);

    const cities = [
        'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura',
        'Polonnaruwa', 'Kurunegala', 'Ratnapura', 'Badulla', 'Matara',
        'Hambantota', 'Trincomalee', 'Batticaloa', 'Ampara'
    ];

    const farmingTypes = [
        'Vegetables', 'Rice', 'Mixed Farming', 'Livestock', 'Fruits',
        'Spices', 'Tea', 'Coconut', 'Rubber', 'Floriculture'
    ];

    const languages = ['Sinhala', 'Tamil', 'English'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.farmingType) newErrors.farmingType = 'Farming type is required';
        if (!formData.language) newErrors.language = 'Preferred language is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/api/users/register', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Registration response:', response.data);
                alert('Registration successful!');

                localStorage.setItem('userInfo', JSON.stringify(response.data));
                navigate('/login');
            } catch (error) {
                console.error('Registration error details:', {
                    error: error,
                    response: error.response,
                    request: error.request
                });

                if (error.response) {
                    // Server responded with error status
                    alert(`Registration failed: ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    // Request was made but no response
                    alert('Registration failed: No response from server');
                } else {
                    // Other errors
                    alert(`Registration failed: ${error.message}`);
                }
            }
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            console.log('Google credential received:', credentialResponse);
            
            // Send the OpenID Connect credential to backend for verification
            const response = await axios.post('http://localhost:5000/api/auth/google', {
                credential: credentialResponse.credential
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Google OpenID Connect registration successful:', response.data);
            
            if (response.data.success) {
                alert('Registration successful!');
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                navigate('/login');
            } else {
                alert(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Google OpenID Connect registration failed:', error);
            let errorMessage = 'Google registration failed. Please try again.';

            if (error.response) {
                // Server responded with error status
                const errorData = error.response.data;
                errorMessage = errorData.message || errorData.error || errorMessage;
                console.error('Server error response:', errorData);
            } else if (error.request) {
                // Request was made but no response
                errorMessage = 'No response from server. Please check if the backend is running.';
                console.error('No response received:', error.request);
            } else {
                // Other errors
                errorMessage = error.message || errorMessage;
                console.error('Other error:', error);
            }

            alert(errorMessage);
        }
    };

    const handleGoogleError = (error) => {
        console.error('Google OpenID Connect registration failed:', error);
        let errorMessage = 'Google registration failed. Please try again.';
        
        if (error && error.error) {
            switch (error.error) {
                case 'popup_closed_by_user':
                    errorMessage = 'Registration cancelled by user.';
                    break;
                case 'access_denied':
                    errorMessage = 'Access denied. Please try again.';
                    break;
                case 'immediate_failed':
                    errorMessage = 'One-tap sign-in failed. Please use the button above.';
                    break;
                default:
                    errorMessage = `Google error: ${error.error}`;
            }
        }
        
        alert(errorMessage);
    };

    const handleFacebookLogin = () => {
        if (!window.FB) {
            alert('Facebook SDK not loaded. Please try again.');
            return;
        }

        window.FB.login(async (response) => {
            if (response.authResponse) {
                try {
                    console.log('Facebook login successful:', response);
                    
                    // Send the access token to backend for verification
                    const backendResponse = await axios.post('http://localhost:5000/api/auth/facebook', {
                        accessToken: response.authResponse.accessToken
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log('Facebook OAuth registration successful:', backendResponse.data);
                    
                    if (backendResponse.data.success) {
                        alert('Registration successful!');
                        localStorage.setItem('userInfo', JSON.stringify(backendResponse.data));
                        navigate('/login');
                    } else {
                        alert(backendResponse.data.message || 'Registration failed');
                    }
                } catch (error) {
                    console.error('Facebook OAuth registration failed:', error);
                    let errorMessage = 'Facebook registration failed. Please try again.';

                    if (error.response) {
                        // Server responded with error status
                        const errorData = error.response.data;
                        errorMessage = errorData.message || errorData.error || errorMessage;
                        console.error('Server error response:', errorData);
                    } else if (error.request) {
                        // Request was made but no response
                        errorMessage = 'No response from server. Please check if the backend is running.';
                        console.error('No response received:', error.request);
                    } else {
                        // Other errors
                        errorMessage = error.message || errorMessage;
                        console.error('Other error:', error);
                    }

                    alert(errorMessage);
                }
            } else {
                console.log('Facebook login cancelled or failed');
                alert('Facebook login was cancelled or failed. Please try again.');
            }
        }, {
            scope: 'email,public_profile'
        });
    };

    const handleSocialLogin = (provider) => {
        console.log(`${provider} login clicked`);
        // Implement social login logic here
        alert(`${provider} login integration would be implemented here`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background with farming theme - same as login page */}
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

            {/* Floating particles effect - same as login page */}
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

            {/* Register Form Container */}
            <div className="relative z-10 w-full max-w-[600px] mx-auto mt-24">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                    {/* Logo and Title */}
                    <div className="text-center mb-8">
                        <div
                            className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4 shadow-lg">
                            <Sprout className="w-8 h-8 text-white"/>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">ModGoviya</h1>
                        <p className="text-gray-600">Join the farming revolution</p>
                    </div>

                    {/* Registration Form */}
                    <div className="space-y-6">
                        {/* Full Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white/90"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400"/>
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
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400"/>
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
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600"/>
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600"/>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white/90"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600"/>
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600"/>
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>

                        {/* Mobile Number Field */}
                        <div className="space-y-2">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    required
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white/90"
                                    placeholder="Enter your mobile number"
                                />
                            </div>
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                        </div>

                        {/* Location Field */}
                        <div className="space-y-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400"/>
                                </div>
                                <select
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white/90 appearance-none"
                                >
                                    <option value="">Select your location</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                        </div>

                        {/* Farming Type Field */}
                        <div className="space-y-2">
                            <label htmlFor="farmingType" className="block text-sm font-medium text-gray-700">
                                Type of Farming
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Sprout className="h-5 w-5 text-gray-400"/>
                                </div>
                                <select
                                    id="farmingType"
                                    name="farmingType"
                                    value={formData.farmingType}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white/90 appearance-none"
                                >
                                    <option value="">Select farming type</option>
                                    {farmingTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.farmingType && <p className="text-red-500 text-sm">{errors.farmingType}</p>}
                        </div>

                        {/* Language Field */}
                        <div className="space-y-2">
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                                Preferred Language
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Globe className="h-5 w-5 text-gray-400"/>
                                </div>
                                <select
                                    id="language"
                                    name="language"
                                    value={formData.language}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white/90 appearance-none"
                                >
                                    <option value="">Select preferred language</option>
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.language && <p className="text-red-500 text-sm">{errors.language}</p>}
                        </div>

                        {/* Register Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        >
                            Create Account
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

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        {/* Google Login */}
                        <GoogleOAuthProvider clientId="683378788042-ivnm3u6vv9uuapvnu63slakp1e48fuki.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                useOneTap={false}
                                text="signup_with"
                                shape="rectangular"
                                size="large"
                                width="100%"
                                theme="filled_blue"
                                logo_alignment="left"
                                context="signup"
                            />
                        </GoogleOAuthProvider>

                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    onClick={() => handleSocialLogin('Google')}*/}
                        {/*    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 bg-white/90"*/}
                        {/*>*/}
                        {/*    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">*/}
                        {/*        <path fill="#4285F4"*/}
                        {/*              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>*/}
                        {/*        <path fill="#34A853"*/}
                        {/*              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>*/}
                        {/*        <path fill="#FBBC05"*/}
                        {/*              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>*/}
                        {/*        <path fill="#EA4335"*/}
                        {/*              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>*/}
                        {/*    </svg>*/}
                        {/*    <span className="text-gray-700 font-medium">Continue with Google</span>*/}
                        {/*</button>*/}

                        {/* Facebook Login */}
                        <button
                            type="button"
                            onClick={handleFacebookLogin}
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 bg-white/90"
                        >
                            <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            <span className="text-gray-700 font-medium">Continue with Facebook</span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-200"
                            >
                                Sign in here
                            </a>
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

export default RegisterPage;
