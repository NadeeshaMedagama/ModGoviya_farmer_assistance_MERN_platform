import React, { useState } from 'react';
import {
    HelpCircle,
    MessageSquare,
    Phone,
    Mail,
    Clock,
    Search,
    ChevronDown,
    ChevronRight,
    User,
    Leaf,
    Send,
    CheckCircle,
    AlertCircle,
    BookOpen,
    Video,
    FileText,
    Users,
    Smartphone,
    Globe,
    MapPin,
    Star,
    ArrowRight,
    Zap,
    Shield,
    Headphones
} from 'lucide-react';
import Header from "../layout/Header";

const SupportPage = () => {
    const [activeTab, setActiveTab] = useState('faq');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        category: '',
        message: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const faqData = [
        {
            id: 1,
            question: "How do I get started with ModGoviya?",
            answer: "Getting started is easy! Simply create your account, complete your farmer profile, and explore our features like weather updates, marketplace, and community forums. Our onboarding guide will walk you through each step."
        },
        {
            id: 2,
            question: "How accurate are the weather predictions?",
            answer: "Our weather data is sourced from multiple meteorological services and is updated every hour. We provide 7-day forecasts with 85-90% accuracy, including rainfall predictions, temperature, and humidity specifically tailored for agricultural needs."
        },
        {
            id: 3,
            question: "Can I sell my produce directly through ModGoviya?",
            answer: "Yes! Our marketplace connects you directly with buyers, retailers, and other farmers. You can list your produce, set prices, manage inventory, and handle transactions securely through our platform."
        },
        {
            id: 4,
            question: "Is ModGoviya available in Sinhala and Tamil?",
            answer: "Absolutely! ModGoviya supports Sinhala, Tamil, and English to serve all Sri Lankan farmers. You can switch languages from your profile settings at any time."
        },
        {
            id: 5,
            question: "How do I access expert farming advice?",
            answer: "Connect with agricultural experts through our community forum, schedule one-on-one consultations, or browse our extensive library of farming guides and video tutorials created by certified agricultural specialists."
        },
        {
            id: 6,
            question: "What crops does ModGoviya support?",
            answer: "We support all major Sri Lankan crops including rice, tea, rubber, coconut, vegetables, fruits, and spices. Our platform provides specific guidance for each crop type with localized growing tips and market information."
        }
    ];

    const supportCategories = [
        {
            icon: User,
            title: "Account & Profile",
            description: "Help with account setup, profile management, and login issues",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Smartphone,
            title: "Mobile App",
            description: "Support for iOS and Android app features and troubleshooting",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Globe,
            title: "Marketplace",
            description: "Buying, selling, payment issues, and transaction support",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Leaf,
            title: "Farming Tools",
            description: "Weather data, crop planning, and agricultural guidance",
            color: "from-orange-500 to-red-500"
        }
    ];

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
        setContactForm({ name: '', email: '', category: '', message: '' });
    };

    const filteredFaqs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <Header />

            <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <Headphones className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-yellow-800" />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
                        <p className="text-xl text-green-100 max-w-2xl mx-auto">
                            Get the support you need to make the most of ModGoviya. We're here to help you grow your agricultural success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Support Options */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold ml-4 text-gray-900 dark:text-white">Live Chat</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Get instant help from our support team. Available 24/7 for urgent issues.
                        </p>
                        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200">
                            Start Chat
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold ml-4 text-gray-900 dark:text-white">Phone Support</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Speak directly with our agriculture experts for complex issues.
                        </p>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">+94 11 234 5678</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Fri 8AM-6PM</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold ml-4 text-gray-900 dark:text-white">Email Support</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Send us detailed questions and get comprehensive answers within 24 hours.
                        </p>
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">support@modgoviya.lk</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Response within 24h</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Support Categories */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Support Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {supportCategories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{category.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{category.description}</p>
                                    <button className="mt-4 text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 flex items-center">
                                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('faq')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'faq'
                                        ? 'border-green-500 text-green-600 dark:text-green-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Frequently Asked Questions
                            </button>
                            <button
                                onClick={() => setActiveTab('contact')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'contact'
                                        ? 'border-green-500 text-green-600 dark:text-green-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Contact Form
                            </button>
                            <button
                                onClick={() => setActiveTab('resources')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'resources'
                                        ? 'border-green-500 text-green-600 dark:text-green-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                            >
                                Resources
                            </button>
                        </nav>
                    </div>
                </div>

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                    <div>
                        {/* Search */}
                        <div className="mb-8">
                            <div className="relative max-w-md mx-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search FAQs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* FAQ Items */}
                        <div className="space-y-4">
                            {filteredFaqs.map((faq) => (
                                <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                    >
                                        <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                                        {expandedFaq === faq.id ? (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-500" />
                                        )}
                                    </button>
                                    {expandedFaq === faq.id && (
                                        <div className="px-6 pb-4">
                                            <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact Form Tab */}
                {activeTab === 'contact' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a message</h3>

                            {formSubmitted ? (
                                <div className="text-center py-8">
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                                    <p className="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={contactForm.name}
                                                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Category
                                        </label>
                                        <select
                                            required
                                            value={contactForm.category}
                                            onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select a category</option>
                                            <option value="technical">Technical Issue</option>
                                            <option value="billing">Billing & Payments</option>
                                            <option value="feature">Feature Request</option>
                                            <option value="general">General Inquiry</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            required
                                            rows="5"
                                            value={contactForm.message}
                                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="Please describe your issue or question in detail..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        <span>Send Message</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">User Guide</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Complete documentation on how to use all ModGoviya features effectively.
                            </p>
                            <button className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300">
                                Read Guide →
                            </button>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Video Tutorials</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Step-by-step video guides for getting the most out of our platform.
                            </p>
                            <button className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300">
                                Watch Videos →
                            </button>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Community Forum</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Connect with other farmers and get answers from the community.
                            </p>
                            <button className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300">
                                Join Discussion →
                            </button>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">API Documentation</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Technical documentation for developers integrating with ModGoviya.
                            </p>
                            <button className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300">
                                View Docs →
                            </button>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Security Center</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Information about keeping your account and data secure.
                            </p>
                            <button className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300">
                                Learn More →
                            </button>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">What's New</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Stay updated with the latest features and improvements.
                            </p>
                            <button className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300">
                                See Updates →
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Information Section */}
            <div className="bg-gray-100 dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            We're here to support your agricultural journey. Reach out to us through any of these channels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                123 Agriculture Avenue<br />
                                Colombo 03, Sri Lanka
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                +94 11 234 5678<br />
                                Mon-Fri 8AM-6PM
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                support@modgoviya.lk<br />
                                Response within 24h
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Support Hours</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                24/7 Live Chat<br />
                                Emergency Support Available
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency Support Banner */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <AlertCircle className="w-8 h-8 mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold">Emergency Agricultural Support</h3>
                                <p className="text-red-100">For urgent crop diseases, pest outbreaks, or weather emergencies</p>
                            </div>
                        </div>
                        <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200">
                            Call Now: +94 11 Emergency
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Stories */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Farmers Say</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Real experiences from farmers who've found success with ModGoviya support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                "The support team helped me set up automated weather alerts. Now I never miss important weather changes that could affect my crops!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">RK</span>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Ravi Kumara</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Rice Farmer, Anuradhapura</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                "Quick response time and very knowledgeable support staff. They helped me connect with buyers for my vegetable harvest within hours!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">SP</span>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Saman Perera</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Vegetable Grower, Kandy</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                "The 24/7 chat support is amazing. They helped me identify a pest problem at 2 AM and provided immediate solutions!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">NF</span>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Nimal Fernando</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Tea Plantation, Nuwara Eliya</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
                    <p className="text-xl text-green-100 mb-8">
                        Our dedicated support team is always ready to assist you with any questions or challenges you may face.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-medium hover:bg-green-50 transition-all duration-200 flex items-center justify-center space-x-2">
                            <MessageSquare className="w-5 h-5" />
                            <span>Start Live Chat</span>
                        </button>
                        <button className="bg-green-800 bg-opacity-50 text-white px-8 py-4 rounded-lg font-medium hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm">
                            <Phone className="w-5 h-5" />
                            <span>Schedule a Call</span>
                        </button>
                    </div>
                    <p className="mt-6 text-green-200 text-sm">
                        Average response time: Less than 5 minutes during business hours
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
