import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MapPin, CheckCircle, ArrowLeft, Globe, Video, Users } from 'lucide-react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { scheduleDemo } from '../../api/axios';

const ScheduleDemo = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        employees: '',
        industry: '',
        timezone: 'UTC-5 (EST)',
        demoType: 'live',
        interests: [],
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [demoResponse, setDemoResponse] = useState(null);

    // Available time slots
    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
    ];

    // Demo types
    const demoTypes = [
        { id: 'live', title: 'Live Demo', description: 'Interactive session with our expert', icon: Video, duration: '30 min' },
        { id: 'group', title: 'Group Demo', description: 'Join other prospects in a group session', icon: Users, duration: '45 min' },
        { id: 'custom', title: 'Custom Demo', description: 'Tailored demo for your specific needs', icon: User, duration: '60 min' }
    ];

    // Industries
    const industries = [
        'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
        'Retail', 'Real Estate', 'Marketing', 'Consulting', 'Other'
    ];

    // Company sizes
    const companySizes = [
        '1-10 employees', '11-50 employees', '51-200 employees',
        '201-1000 employees', '1000+ employees'
    ];

    // Interest areas
    const interestAreas = [
        'Product Features', 'Implementation', 'Pricing', 'Integration',
        'Security', 'Support', 'Training', 'ROI Analysis'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const demoData = {
                ...formData,
                selectedDate,
                selectedTime
            };

            const response = await scheduleDemo(demoData);
            
            if (response.data.success) {
                setDemoResponse(response.data.data);
            setIsSubmitted(true);
            } else {
                setError(response.data.message || 'Failed to schedule demo');
            }
        } catch (error) {
            console.error('Demo scheduling error:', error);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.data?.errors) {
                setError(error.response.data.errors[0]?.msg || 'Validation failed');
            } else {
                setError('Failed to schedule demo. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateCalendarDays = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const formatDisplayDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="mb-8 animate-bounce">
                            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Demo Scheduled Successfully!</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Thank you for scheduling a demo with us. We've sent a confirmation email with all the details.
                        </p>
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Demo Details</h3>
                            <div className="space-y-4 text-left">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                                    <span className="font-medium">Date:</span>
                                    <span className="ml-2">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                                    <span className="font-medium">Time:</span>
                                    <span className="ml-2">{selectedTime} {formData.timezone}</span>
                                </div>
                                <div className="flex items-center">
                                    <Video className="w-5 h-5 text-blue-600 mr-3" />
                                    <span className="font-medium">Demo Type:</span>
                                    <span className="ml-2">{demoTypes.find(d => d.id === formData.demoType)?.title}</span>
                                </div>
                                <div className="flex items-center">
                                    <Building className="w-5 h-5 text-blue-600 mr-3" />
                                    <span className="font-medium">Company:</span>
                                    <span className="ml-2">{formData.company}</span>
                                </div>
                                <div className="flex items-center">
                                    <User className="w-5 h-5 text-blue-600 mr-3" />
                                    <span className="font-medium">Contact:</span>
                                    <span className="ml-2">{formData.firstName} {formData.lastName}</span>
                                </div>
                                {demoResponse && (
                                    <div className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                        <span className="font-medium">Demo ID:</span>
                                        <span className="ml-2 font-mono text-sm bg-gray-100 px-2 py-1 rounded">{demoResponse._id}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setDemoResponse(null);
                                setSelectedDate('');
                                setSelectedTime('');
                                setFormData({
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    phone: '',
                                    company: '',
                                    jobTitle: '',
                                    employees: '',
                                    industry: '',
                                    timezone: 'UTC-5 (EST)',
                                    demoType: 'live',
                                    interests: [],
                                    message: ''
                                });
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                        >
                            Schedule Another Demo
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <Header />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-12 pt-20">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Schedule Your Demo
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Book a personalized demo and discover how our solution can transform your business.
                            Choose your preferred time and let our experts show you the possibilities.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column - Demo Types */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Demo Experience</h3>
                                <div className="space-y-4">
                                    {demoTypes.map((demo) => {
                                        const IconComponent = demo.icon;
                                        return (
                                            <div
                                                key={demo.id}
                                                onClick={() => setFormData(prev => ({ ...prev, demoType: demo.id }))}
                                                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                                                    formData.demoType === demo.id
                                                        ? 'border-blue-500 bg-blue-50 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                                }`}
                                            >
                                                <div className="flex items-start">
                                                    <IconComponent className={`w-6 h-6 mr-3 mt-1 ${
                                                        formData.demoType === demo.id ? 'text-blue-600' : 'text-gray-500'
                                                    }`} />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-semibold text-gray-900">{demo.title}</h4>
                                                            <span className="text-sm text-gray-500">{demo.duration}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{demo.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                                    <h4 className="font-semibold text-gray-900 mb-2">What to Expect:</h4>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Live product walkthrough</li>
                                        <li>• Q&A with our experts</li>
                                        <li>• Custom use case discussion</li>
                                        <li>• Implementation roadmap</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Booking Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
                                {/* Date Selection */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                        Select Date
                                    </h3>
                                    <div className="grid grid-cols-7 gap-2">
                                        {generateCalendarDays().map((date, index) => {
                                            const dateStr = formatDate(date);
                                            const isSelected = selectedDate === dateStr;
                                            const isToday = index === 0;

                                            return (
                                                <button
                                                    key={dateStr}
                                                    type="button"
                                                    onClick={() => setSelectedDate(dateStr)}
                                                    className={`p-3 rounded-lg text-center transition-all duration-200 ${
                                                        isSelected
                                                            ? 'bg-blue-600 text-white shadow-lg'
                                                            : isToday
                                                                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    <div className="text-xs font-medium">{formatDisplayDate(date).split(' ')[0]}</div>
                                                    <div className="text-sm font-bold">{date.getDate()}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Time Selection */}
                                {selectedDate && (
                                    <div className="mb-8">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                            <Clock className="w-5 h-5 mr-2 text-blue-600" />
                                            Select Time
                                        </h3>
                                        <div className="grid grid-cols-4 gap-3">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`p-3 rounded-lg text-center transition-all duration-200 ${
                                                        selectedTime === time
                                                            ? 'bg-blue-600 text-white shadow-lg'
                                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Personal Information */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-blue-600" />
                                        Your Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Company Information */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                        <Building className="w-5 h-5 mr-2 text-blue-600" />
                                        Company Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Your Company Inc."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                            <input
                                                type="text"
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="CEO, CTO, etc."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                                            <select
                                                name="employees"
                                                value={formData.employees}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select company size</option>
                                                {companySizes.map((size) => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                                            <select
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select industry</option>
                                                {industries.map((industry) => (
                                                    <option key={industry} value={industry}>{industry}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Areas of Interest */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Areas of Interest</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {interestAreas.map((interest) => (
                                            <button
                                                key={interest}
                                                type="button"
                                                onClick={() => handleInterestToggle(interest)}
                                                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                    formData.interests.includes(interest)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Message */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Tell us about your specific needs or questions..."
                                    />
                                </div>

                                {/* Timezone */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <Globe className="w-4 h-4 mr-2" />
                                        Timezone
                                    </label>
                                    <select
                                        name="timezone"
                                        value={formData.timezone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="UTC-8 (PST)">UTC-8 (PST) - Pacific Time</option>
                                        <option value="UTC-7 (MST)">UTC-7 (MST) - Mountain Time</option>
                                        <option value="UTC-6 (CST)">UTC-6 (CST) - Central Time</option>
                                        <option value="UTC-5 (EST)">UTC-5 (EST) - Eastern Time</option>
                                        <option value="UTC+0 (GMT)">UTC+0 (GMT) - Greenwich Mean Time</option>
                                        <option value="UTC+1 (CET)">UTC+1 (CET) - Central European Time</option>
                                    </select>
                                </div>

                                {/* Error Display */}
                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{error}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!selectedDate || !selectedTime || !formData.firstName || !formData.lastName || !formData.email || !formData.company || isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                                >
                                    {isSubmitting ? 'Scheduling Demo...' : 'Schedule Demo'}
                                </button>

                                <p className="text-sm text-gray-500 text-center mt-4">
                                    By scheduling a demo, you agree to our Terms of Service and Privacy Policy.
                                    We'll send you a calendar invitation and reminder emails.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ScheduleDemo;
