import React, { useState } from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Send,
    MessageCircle,
    Facebook,
    Instagram,
    Twitter,
    MessageSquare,
    CheckCircle,
    AlertCircle,
    Shield
} from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const subjectOptions = [
        'General Inquiry',
        'Technical Support',
        'Partnership Opportunity',
        'Product Information',
        'Feedback & Suggestions',
        'Other'
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.subject) {
            newErrors.subject = 'Please select a subject';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        return newErrors;
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        // Simulate API call
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit form');
            }
            setSubmitStatus('success');
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Header Section */}
            <Header />
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            We're here to help! Reach out to us with any questions, suggestions, or partnership inquiries.
                            Our team will respond as soon as possible.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <div className="flex items-center mb-6">
                                <MessageCircle className="h-6 w-6 text-green-600 mr-3" />
                                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                                    <span className="text-green-800">Thank you! Your message has been sent successfully.</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                    <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                                    <span className="text-red-800">Sorry, there was an error sending your message. Please try again.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                                errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                                            }`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.fullName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                                            }`}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                                            placeholder="+94 71 234 5678"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                                errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                                            }`}
                                        >
                                            <option value="">Select a subject</option>
                                            {subjectOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                        {errors.subject && (
                                            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 resize-vertical ${
                                            errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-green-500'
                                        }`}
                                        placeholder="Tell us how we can help you..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            Sending...
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <Send className="h-5 w-5 mr-2" />
                                            Send Message
                                        </div>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-green-100 rounded-lg p-3 mr-4">
                                        <Phone className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                                        <p className="text-gray-600">+94 71 234 5678</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                                        <Mail className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                        <p className="text-gray-600">support@modgoviya.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                                        <MapPin className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Office Address</h4>
                                        <p className="text-gray-600">
                                            Mod Goviya Innovations<br />
                                            No. 45, Agritech Lane<br />
                                            Kotikawatta, Colombo, Sri Lanka
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900">Visit Our Office</h3>
                            </div>
                            <div className="h-64 bg-gray-100 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                    <p className="text-sm">Interactive Map</p>
                                    <p className="text-xs">Kotikawatta, Colombo</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Connect With Us</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href="#"
                                    className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                                >
                                    <Facebook className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                                    <span className="ml-2 font-medium text-blue-900">Facebook</span>
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center justify-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors group"
                                >
                                    <Instagram className="h-6 w-6 text-pink-600 group-hover:scale-110 transition-transform" />
                                    <span className="ml-2 font-medium text-pink-900">Instagram</span>
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center justify-center p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors group"
                                >
                                    <Twitter className="h-6 w-6 text-sky-600 group-hover:scale-110 transition-transform" />
                                    <span className="ml-2 font-medium text-sky-900">Twitter</span>
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                                >
                                    <MessageSquare className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                                    <span className="ml-2 font-medium text-green-900">WhatsApp</span>
                                </a>
                            </div>
                        </div>

                        {/* Privacy Note */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <div className="flex items-start">
                                <Shield className="h-5 w-5 text-gray-600 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Privacy & Security</h4>
                                    <p className="text-sm text-gray-600">
                                        Your information is safe with us. We will never share your personal data without your consent.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Chat Button */}
            <div className="fixed bottom-6 right-6">
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group">
                    <MessageCircle className="h-6 w-6 group-hover:animate-bounce" />
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
