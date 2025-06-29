import React, { useState, useEffect } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Eye,
    EyeOff,
    ArrowRight,
    Shield,
    CheckCircle,
    Store,
    Users,
    TrendingUp,
    Camera,
    FileText,
    Briefcase,
    Lock,
    Sprout,
    Tractor,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const StartTrading = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userType, setUserType] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        // Personal Info
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',

        // Location
        address: '',
        city: '',
        province: '',
        postalCode: '',

        // Business Info
        businessName: '',
        businessType: '',
        businessDescription: '',
        experience: '',
        specialization: [],

        // Documents
        nationalId: null,
        businessLicense: null,
        profilePhoto: null,

        // Terms
        agreeToTerms: false,
        agreeToMarketing: false
    });

    const [errors, setErrors] = useState({});
    const [provinces] = useState([
        'Western Province',
        'Central Province',
        'Southern Province',
        'North Western Province',
        'North Central Province',
        'Uva Province',
        'Sabaragamuwa Province',
        'Northern Province',
        'Eastern Province'
    ]);

    const [specializations] = useState([
        'Rice Farming', 'Vegetable Farming', 'Fruit Cultivation', 'Spice Cultivation',
        'Tea Cultivation', 'Coconut Farming', 'Dairy Farming', 'Poultry Farming',
        'Fish Farming', 'Organic Farming', 'Equipment Trading', 'Seed Supply',
        'Fertilizer Supply', 'Agricultural Services'
    ]);

    const userTypes = [
        {
            id: 'farmer',
            title: 'Farmer',
            subtitle: 'Sell your crops, livestock, and farm products',
            icon: <Sprout className="w-8 h-8" />,
            features: ['Sell directly to buyers', 'Set your own prices', 'Build your reputation', 'Access to farming tools'],
            color: 'from-green-500 to-emerald-600'
        },
        {
            id: 'supplier',
            title: 'Equipment Supplier',
            subtitle: 'Sell farming tools, equipment, and supplies',
            icon: <Tractor className="w-8 h-8" />,
            features: ['List equipment & tools', 'Reach more customers', 'Bulk order management', 'Business analytics'],
            color: 'from-blue-500 to-cyan-600'
        },
        {
            id: 'buyer',
            title: 'Buyer/Trader',
            subtitle: 'Source quality agricultural products',
            icon: <Store className="w-8 h-8" />,
            features: ['Access verified sellers', 'Bulk purchasing', 'Quality assurance', 'Supply chain tracking'],
            color: 'from-purple-500 to-indigo-600'
        }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleSpecializationToggle = (spec) => {
        setFormData(prev => ({
            ...prev,
            specialization: prev.specialization.includes(spec)
                ? prev.specialization.filter(s => s !== spec)
                : [...prev.specialization, spec]
        }));
    };

    const handleFileUpload = (field, file) => {
        setFormData(prev => ({
            ...prev,
            [field]: file
        }));
    };

    const validateStep = (step) => {
        const newErrors = {};

        switch(step) {
            case 1:
                if (!userType) newErrors.userType = 'Please select an account type';
                break;

            case 2:
                if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
                if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
                if (!formData.email.trim()) newErrors.email = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
                if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
                if (!formData.password) newErrors.password = 'Password is required';
                else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
                if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
                break;

            case 3:
                if (!formData.address.trim()) newErrors.address = 'Address is required';
                if (!formData.city.trim()) newErrors.city = 'City is required';
                if (!formData.province) newErrors.province = 'Province is required';
                break;

            case 4:
                if (userType !== 'buyer') {
                    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
                    if (!formData.businessType) newErrors.businessType = 'Business type is required';
                    if (formData.specialization.length === 0) newErrors.specialization = 'Please select at least one specialization';
                }
                break;

            case 5:
                if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 5));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!validateStep(5)) return;

        setIsLoading(true);

        try {
            // Simulate API call to register user
            const userData = {
                ...formData,
                userType,
                createdAt: new Date(),
                status: 'pending',
                isVerified: false
            };

            // In a real app, you would send this to your backend API
            console.log('Registering user:', userData);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            alert('Registration successful! Please check your email for verification instructions.');

        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step <= currentStep
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                    }`}>
                        {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                    </div>
                    {step < 5 && (
                        <div className={`w-16 h-1 mx-2 ${
                            step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const FileUploadBox = ({ label, field, accept, icon: Icon }) => (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
            <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
            <input
                type="file"
                accept={accept}
                onChange={(e) => handleFileUpload(field, e.target.files[0])}
                className="hidden"
                id={field}
            />
            <label
                htmlFor={field}
                className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
            >
                Choose File
            </label>
            {formData[field] && (
                <p className="text-xs text-green-600 mt-2">{formData[field].name}</p>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Header */}
            <Header />

            <div className="bg-white shadow-sm border-b mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-green-600 p-2 rounded-lg mr-3">
                                <Sprout className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Start Trading</h1>
                        </div>
                        <button className="text-green-600 hover:text-green-700 font-medium">
                            Already have an account? Sign In
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <StepIndicator />

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Step 1: Choose Account Type */}
                    {currentStep === 1 && (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Account Type</h2>
                            <p className="text-gray-600 mb-8">Select the option that best describes your trading needs</p>

                            <div className="grid md:grid-cols-3 gap-6">
                                {userTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        onClick={() => setUserType(type.id)}
                                        className={`cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                            userType === type.id
                                                ? 'border-green-500 bg-green-50 shadow-lg'
                                                : 'border-gray-200 hover:border-green-300'
                                        }`}
                                    >
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center text-white mx-auto mb-4`}>
                                            {type.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{type.subtitle}</p>
                                        <ul className="text-left space-y-2">
                                            {type.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-700">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {errors.userType && (
                                <p className="text-red-500 text-sm mt-4">{errors.userType}</p>
                            )}
                        </div>
                    )}

                    {/* Step 2: Personal Information */}
                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
                            <p className="text-gray-600 mb-8">Tell us a bit about yourself</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your first name"
                                    />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                            errors.lastName ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your last name"
                                    />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.email ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.phone ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            placeholder="+94 77 123 4567"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.password ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Location Information */}
                    {currentStep === 3 && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Location Information</h2>
                            <p className="text-gray-600 mb-8">Help buyers find you by providing your location</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.address ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your street address"
                                        />
                                    </div>
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.city ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your city"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Province *</label>
                                        <select
                                            value={formData.province}
                                            onChange={(e) => handleInputChange('province', e.target.value)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.province ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Select Province</option>
                                            {provinces.map(province => (
                                                <option key={province} value={province}>{province}</option>
                                            ))}
                                        </select>
                                        {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            value={formData.postalCode}
                                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="Enter postal code"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Business Information */}
                    {currentStep === 4 && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Information</h2>
                            <p className="text-gray-600 mb-8">Tell us about your {userType === 'farmer' ? 'farming' : userType === 'supplier' ? 'supply' : 'trading'} business</p>

                            {userType !== 'buyer' ? (
                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                                            <input
                                                type="text"
                                                value={formData.businessName}
                                                onChange={(e) => handleInputChange('businessName', e.target.value)}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                    errors.businessName ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter your business name"
                                            />
                                            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                                            <select
                                                value={formData.businessType}
                                                onChange={(e) => handleInputChange('businessType', e.target.value)}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                    errors.businessType ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="">Select Business Type</option>
                                                <option value="individual">Individual</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="corporation">Corporation</option>
                                                <option value="cooperative">Cooperative</option>
                                            </select>
                                            {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                                        <textarea
                                            value={formData.businessDescription}
                                            onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="Describe your business and what you offer..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                                        <select
                                            value={formData.experience}
                                            onChange={(e) => handleInputChange('experience', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Experience</option>
                                            <option value="0-1">Less than 1 year</option>
                                            <option value="1-3">1-3 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="5-10">5-10 years</option>
                                            <option value="10+">More than 10 years</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
                                        <p className="text-sm text-gray-600 mb-3">Select all areas that apply to your business</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {specializations.map(spec => (
                                                <label key={spec} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.specialization.includes(spec)}
                                                        onChange={() => handleSpecializationToggle(spec)}
                                                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{spec}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.specialization && <p className="text-red-500 text-xs mt-2">{errors.specialization}</p>}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Store className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Start Buying!</h3>
                                    <p className="text-gray-600">As a buyer, you can start browsing and purchasing immediately after registration.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: Documents & Terms */}
                    {currentStep === 5 && (
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Final Steps</h2>
                            <p className="text-gray-600 mb-8">Upload required documents and agree to our terms</p>

                            <div className="space-y-8">
                                {/* Document Upload */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Upload</h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <FileUploadBox
                                            label="Profile Photo"
                                            field="profilePhoto"
                                            accept="image/*"
                                            icon={Camera}
                                        />
                                        <FileUploadBox
                                            label="National ID"
                                            field="nationalId"
                                            accept="image/*,.pdf"
                                            icon={FileText}
                                        />
                                        {userType !== 'buyer' && (
                                            <FileUploadBox
                                                label="Business License"
                                                field="businessLicense"
                                                accept="image/*,.pdf"
                                                icon={Briefcase}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <input
                                                type="checkbox"
                                                id="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5"
                                            />
                                            <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
                                                I agree to the <span className="text-green-600 hover:text-green-700 cursor-pointer font-medium">Terms and Conditions</span> and <span className="text-green-600 hover:text-green-700 cursor-pointer font-medium">Privacy Policy</span> *
                                            </label>
                                        </div>
                                        {errors.agreeToTerms && <p className="text-red-500 text-xs ml-7">{errors.agreeToTerms}</p>}

                                        <div className="flex items-start">
                                            <input
                                                type="checkbox"
                                                id="agreeToMarketing"
                                                checked={formData.agreeToMarketing}
                                                onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5"
                                            />
                                            <label htmlFor="agreeToMarketing" className="ml-3 text-sm text-gray-700">
                                                I would like to receive marketing communications and updates about new features
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Notice */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <h4 className="text-sm font-medium text-blue-900 mb-1">Security & Privacy</h4>
                                            <p className="text-xs text-blue-700">Your information is encrypted and secure. We follow industry-standard security practices to protect your data and will never share your personal information without your consent.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                                currentStep === 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                            }`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous
                        </button>

                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-500">
                                Step {currentStep} of 5
                            </div>

                            {currentStep < 5 ? (
                                <button
                                    onClick={nextStep}
                                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Complete Registration
                                            <CheckCircle className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                            <Shield className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">Secure & Verified</h3>
                        <p className="text-sm text-gray-600">All users go through verification process</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">Trusted Community</h3>
                        <p className="text-sm text-gray-600">Join thousands of verified traders</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">Grow Your Business</h3>
                        <p className="text-sm text-gray-600">Access tools to scale your operations</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StartTrading;
