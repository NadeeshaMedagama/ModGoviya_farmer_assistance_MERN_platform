import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Eye,
    EyeOff,
    Sprout,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Shield,
    Users,
    Clock,
    Star,
    Globe,
    Leaf,
    Tractor,
    Map,
    Calendar
} from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const GetStartedPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        farmName: '',
        farmSize: '',
        farmType: '',
        location: '',
        district: '',
        province: '',
        experience: '',
        primaryCrops: [],
        language: 'english',
        agreeToTerms: false,
        subscribeNewsletter: true
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const provinces = [
        'Western Province', 'Central Province', 'Southern Province',
        'Northern Province', 'Eastern Province', 'North Western Province',
        'North Central Province', 'Uva Province', 'Sabaragamuwa Province'
    ];

    const farmTypes = [
        'Vegetable Farming', 'Rice Cultivation', 'Tea Plantation',
        'Coconut Cultivation', 'Fruit Farming', 'Spice Cultivation',
        'Livestock Farming', 'Mixed Farming', 'Organic Farming'
    ];

    const cropOptions = [
        'Rice', 'Tea', 'Coconut', 'Rubber', 'Vegetables', 'Fruits',
        'Spices', 'Flowers', 'Sugar Cane', 'Tobacco', 'Other'
    ];

    const benefits = [
        {
            icon: Shield,
            title: "100% Secure",
            description: "Your data is protected with enterprise-grade security"
        },
        {
            icon: Users,
            title: "50,000+ Farmers",
            description: "Join our thriving community of successful farmers"
        },
        {
            icon: Clock,
            title: "24/7 Support",
            description: "Get help whenever you need it, day or night"
        },
        {
            icon: Star,
            title: "Proven Results",
            description: "95% of farmers see improved yields within 3 months"
        }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCropChange = (crop) => {
        setFormData(prev => ({
            ...prev,
            primaryCrops: prev.primaryCrops.includes(crop)
                ? prev.primaryCrops.filter(c => c !== crop)
                : [...prev.primaryCrops, crop]
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
                newErrors.phone = 'Please enter a valid 10-digit phone number';
            }
        } else if (step === 2) {
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters long';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        } else if (step === 3) {
            if (!formData.farmName.trim()) newErrors.farmName = 'Farm name is required';
            if (!formData.farmSize) newErrors.farmSize = 'Farm size is required';
            if (!formData.farmType) newErrors.farmType = 'Farm type is required';
            if (!formData.location.trim()) newErrors.location = 'Location is required';
            if (!formData.district.trim()) newErrors.district = 'District is required';
            if (!formData.province) newErrors.province = 'Province is required';
            if (!formData.experience) newErrors.experience = 'Experience level is required';
            if (formData.primaryCrops.length === 0) newErrors.primaryCrops = 'Please select at least one crop';
        } else if (step === 4) {
            if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(4)) return;

        setIsLoading(true);

        try {
            // Simulate API call to register user
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would make the actual API call to your backend
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful registration
                console.log('User registered successfully');
                // Redirect to dashboard or welcome page
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
                <p className="text-gray-600">Let's start with your basic details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your first name"
                        />
                    </div>
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your last name"
                        />
                    </div>
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                    />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                    />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Secure Your Account</h2>
                <p className="text-gray-600">Create a strong password to protect your account</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Create a strong password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                <div className="mt-2 text-sm text-gray-500">
                    Password must be at least 8 characters long
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                    <div>
                        <h4 className="text-sm font-medium text-green-800">Security Tips</h4>
                        <ul className="mt-1 text-sm text-green-700 space-y-1">
                            <li>• Use a mix of letters, numbers, and symbols</li>
                            <li>• Avoid common words or personal information</li>
                            <li>• Make it at least 8 characters long</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Farm Information</h2>
                <p className="text-gray-600">Tell us about your farming operation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Name *
                    </label>
                    <div className="relative">
                        <Sprout className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            name="farmName"
                            value={formData.farmName}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                                errors.farmName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Enter your farm name"
                        />
                    </div>
                    {errors.farmName && <p className="mt-1 text-sm text-red-600">{errors.farmName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Size (acres) *
                    </label>
                    <select
                        name="farmSize"
                        value={formData.farmSize}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.farmSize ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Select farm size</option>
                        <option value="less-than-1">Less than 1 acre</option>
                        <option value="1-5">1-5 acres</option>
                        <option value="5-10">5-10 acres</option>
                        <option value="10-25">10-25 acres</option>
                        <option value="25-50">25-50 acres</option>
                        <option value="more-than-50">More than 50 acres</option>
                    </select>
                    {errors.farmSize && <p className="mt-1 text-sm text-red-600">{errors.farmSize}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Type *
                </label>
                <select
                    name="farmType"
                    value={formData.farmType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                        errors.farmType ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                    <option value="">Select farm type</option>
                    {farmTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                {errors.farmType && <p className="mt-1 text-sm text-red-600">{errors.farmType}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                                errors.location ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="City/Town"
                        />
                    </div>
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        District *
                    </label>
                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.district ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter district"
                    />
                    {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Province *
                    </label>
                    <select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                            errors.province ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Select province</option>
                        {provinces.map(province => (
                            <option key={province} value={province}>{province}</option>
                        ))}
                    </select>
                    {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farming Experience *
                </label>
                <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                        errors.experience ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="experienced">Experienced (5-10 years)</option>
                    <option value="expert">Expert (10+ years)</option>
                </select>
                {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Crops * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {cropOptions.map(crop => (
                        <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.primaryCrops.includes(crop)}
                                onChange={() => handleCropChange(crop)}
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{crop}</span>
                        </label>
                    ))}
                </div>
                {errors.primaryCrops && <p className="mt-1 text-sm text-red-600">{errors.primaryCrops}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Language
                </label>
                <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                    <option value="english">English</option>
                    <option value="sinhala">Sinhala</option>
                    <option value="tamil">Tamil</option>
                </select>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Almost Done!</h2>
                <p className="text-gray-600">Review your information and complete registration</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Registration Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="ml-2">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2">{formData.email}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Farm:</span>
                        <span className="ml-2">{formData.farmName}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Location:</span>
                        <span className="ml-2">{formData.location}, {formData.province}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Farm Type:</span>
                        <span className="ml-2">{formData.farmType}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Primary Crops:</span>
                        <span className="ml-2">{formData.primaryCrops.join(', ')}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                        I agree to the{' '}
                        <Link to="/terms" className="text-green-600 hover:text-green-700 underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-green-600 hover:text-green-700 underline">
                            Privacy Policy
                        </Link>
                        *
                    </span>
                </label>
                {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}

                <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mt-0.5"
                    />
                    <span className="text-sm text-gray-700">
                        Subscribe to our newsletter for farming tips, weather updates, and platform news
                    </span>
                </label>
            </div>

            {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <span className="text-sm text-red-600">{errors.submit}</span>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Header */}
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Side - Benefits */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-8">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    Join ModGoviya Today
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Start your journey to smarter, more profitable farming with our comprehensive platform.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {benefits.map((benefit, index) => {
                                    const IconComponent = benefit.icon;
                                    return (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white">
                                <div className="flex items-center mb-4">
                                    <Star className="w-6 h-6 text-yellow-300 mr-2" />
                                    <span className="font-semibold">30-Day Free Trial</span>
                                </div>
                                <p className="text-green-100">
                                    Experience all premium features risk-free. No credit card required.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Progress Steps */}
                            <div className="bg-gray-50 px-8 py-6">
                                <div className="flex items-center justify-between">
                                    {[1, 2, 3, 4].map((step) => (
                                        <div key={step} className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                                                step <= currentStep
                                                    ? 'bg-green-600 text-white'
                                                    : step === currentStep + 1
                                                        ? 'bg-green-100 text-green-600 border-2 border-green-600'
                                                        : 'bg-gray-200 text-gray-500'
                                            }`}>
                                                {step < currentStep ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    step
                                                )}
                                            </div>
                                            {step < 4 && (
                                                <div className={`w-16 h-1 mx-2 transition-all ${
                                                    step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                                                }`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 text-sm">
                                    <span className={currentStep >= 1 ? 'text-green-600 font-medium' : 'text-gray-500'}>
                                        Personal Info
                                    </span>
                                    <span className={currentStep >= 2 ? 'text-green-600 font-medium' : 'text-gray-500'}>
                                        Security
                                    </span>
                                    <span className={currentStep >= 3 ? 'text-green-600 font-medium' : 'text-gray-500'}>
                                        Farm Details
                                    </span>
                                    <span className={currentStep >= 4 ? 'text-green-600 font-medium' : 'text-gray-500'}>
                                        Complete
                                    </span>
                                </div>
                            </div>

                            {/* Form Content */}
                            <form onSubmit={handleSubmit} className="p-8">
                                {currentStep === 1 && renderStep1()}
                                {currentStep === 2 && renderStep2()}
                                {currentStep === 3 && renderStep3()}
                                {currentStep === 4 && renderStep4()}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handlePrevious}
                                        className={`px-6 py-3 text-gray-600 font-medium rounded-xl transition-all ${
                                            currentStep === 1
                                                ? 'invisible'
                                                : 'hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    {currentStep < 4 ? (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        >
                                            Next Step
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    Create Account
                                                    <CheckCircle className="ml-2 w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                By creating an account, you'll get access to:
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-700">
                                <span className="flex items-center">
                                    <Globe className="w-4 h-4 mr-1 text-green-600" />
                                    Weather Forecasts
                                </span>
                                <span className="flex items-center">
                                    <Leaf className="w-4 h-4 mr-1 text-green-600" />
                                    Crop Management
                                </span>
                                <span className="flex items-center">
                                    <Tractor className="w-4 h-4 mr-1 text-green-600" />
                                    Equipment Marketplace
                                </span>
                                <span className="flex items-center">
                                    <Users className="w-4 h-4 mr-1 text-green-600" />
                                    Community Support
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default GetStartedPage;
