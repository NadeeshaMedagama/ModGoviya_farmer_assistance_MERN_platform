import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Shield,
    Eye,
    Lock,
    Users,
    Database,
    Globe,
    Mail,
    Phone,
    MapPin,
    Calendar,
    FileText,
    ChevronRight,
    Leaf,
    AlertTriangle,
    CheckCircle,
    Clock,
    ArrowLeft,
    MessageSquare
} from 'lucide-react';
import Header from "../layout/Header";

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('');
    const [lastUpdated] = useState('January 15, 2025');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                    currentSection = section.getAttribute('id');
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const tableOfContents = [
        { id: 'overview', title: 'Overview', icon: Eye },
        { id: 'information-collection', title: 'Information We Collect', icon: Database },
        { id: 'information-use', title: 'How We Use Your Information', icon: Users },
        { id: 'information-sharing', title: 'Information Sharing', icon: Globe },
        { id: 'data-security', title: 'Data Security', icon: Lock },
        { id: 'user-rights', title: 'Your Rights', icon: Shield },
        { id: 'cookies', title: 'Cookies & Tracking', icon: Eye },
        { id: 'children', title: 'Children\'s Privacy', icon: Users },
        { id: 'updates', title: 'Policy Updates', icon: FileText },
        { id: 'contact', title: 'Contact Us', icon: Mail }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <Header />

            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
                    <div className="text-center">
                        {/* Back to Home Button */}
                        {/*<div className="flex justify-start mb-8">*/}
                        {/*    <button*/}
                        {/*        onClick={scrollToTop}*/}
                        {/*        className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"*/}
                        {/*    >*/}
                        {/*        <ArrowLeft size={18} className="mr-2" />*/}
                        {/*        Back to Home*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <Shield className="text-white w-10 h-10" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                    <Leaf className="text-white w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-6">
                            Your privacy is important to us. This policy explains how ModGoviya collects, uses, and protects your personal information.
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-emerald-100">
                            <div className="flex items-center">
                                <Calendar size={18} className="mr-2" />
                                <span>Last Updated: {lastUpdated}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock size={18} className="mr-2" />
                                <span>~15 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Table of Contents - Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-8">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Table of Contents
                                </h3>
                                <nav className="space-y-2">
                                    {tableOfContents.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                                                    activeSection === item.id
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                <Icon size={16} className="mr-3 flex-shrink-0" />
                                                <span className="text-left">{item.title}</span>
                                                <ChevronRight size={14} className="ml-auto opacity-50" />
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            {/* Overview Section */}
                            <section id="overview" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <Eye className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Overview</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-4">
                                        <p>
                                            ModGoviya is committed to protecting your privacy and ensuring the security of your personal information.
                                            As Sri Lanka's leading agriculture platform, we understand the importance of maintaining trust with our farming community.
                                        </p>
                                        <p>
                                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
                                            platform, including our website, mobile applications, and related services.
                                        </p>
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <CheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" size={20} />
                                                <div>
                                                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Our Commitment</h4>
                                                    <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                                                        We are committed to transparency, data minimization, and giving you control over your personal information.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Information Collection */}
                            <section id="information-collection" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <Database className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Information We Collect</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
                                            <ul className="space-y-2 list-disc list-inside">
                                                <li>Name, email address, and phone number</li>
                                                <li>Farm location and address information</li>
                                                <li>Profile picture and biographical information</li>
                                                <li>Payment information for marketplace transactions</li>
                                                <li>Government ID for identity verification (when required)</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Agricultural Data</h3>
                                            <ul className="space-y-2 list-disc list-inside">
                                                <li>Crop types, planting schedules, and harvest information</li>
                                                <li>Farm size, soil conditions, and farming methods</li>
                                                <li>Weather preferences and location-based data</li>
                                                <li>Marketplace listings and transaction history</li>
                                                <li>Community forum posts and interactions</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Information</h3>
                                            <ul className="space-y-2 list-disc list-inside">
                                                <li>Device information and unique identifiers</li>
                                                <li>IP address and geolocation data</li>
                                                <li>Browser type and operating system</li>
                                                <li>Usage patterns and feature preferences</li>
                                                <li>Log files and performance metrics</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Information Use */}
                            <section id="information-use" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <Users className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">How We Use Your Information</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Platform Services</h3>
                                                <ul className="space-y-2 text-sm">
                                                    <li>• Provide personalized farming recommendations</li>
                                                    <li>• Deliver weather alerts and updates</li>
                                                    <li>• Facilitate marketplace transactions</li>
                                                    <li>• Enable community interactions</li>
                                                    <li>• Process payments and manage accounts</li>
                                                </ul>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Improvement & Analytics</h3>
                                                <ul className="space-y-2 text-sm">
                                                    <li>• Analyze platform usage and performance</li>
                                                    <li>• Develop new features and services</li>
                                                    <li>• Conduct agricultural research (anonymized)</li>
                                                    <li>• Improve user experience and interface</li>
                                                    <li>• Prevent fraud and ensure security</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Communications</h3>
                                            <p>We may use your information to send you:</p>
                                            <ul className="mt-2 space-y-1 list-disc list-inside">
                                                <li>Important platform updates and security notifications</li>
                                                <li>Personalized farming tips and seasonal advice</li>
                                                <li>Marketplace notifications and transaction updates</li>
                                                <li>Newsletter and educational content (with your consent)</li>
                                                <li>Customer support responses and assistance</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Information Sharing */}
                            <section id="information-sharing" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <Globe className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Information Sharing</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-6">
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <AlertTriangle className="text-red-600 mr-3 mt-1 flex-shrink-0" size={20} />
                                                <div>
                                                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">We Do Not Sell Your Data</h4>
                                                    <p className="text-red-700 dark:text-red-300 text-sm">
                                                        ModGoviya does not sell, rent, or trade your personal information to third parties for marketing purposes.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Limited Sharing Scenarios</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">Service Providers</h4>
                                                    <p className="text-sm mt-1">Trusted third-party services for payment processing, cloud storage, and platform maintenance.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">Agricultural Research</h4>
                                                    <p className="text-sm mt-1">Anonymized, aggregated data may be shared with agricultural research institutions to benefit the farming community.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">Legal Requirements</h4>
                                                    <p className="text-sm mt-1">When required by law, court order, or to protect our rights and the safety of our users.</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">Business Transactions</h4>
                                                    <p className="text-sm mt-1">In the event of a merger, acquisition, or sale of assets, with proper notice to users.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Data Security */}
                            <section id="data-security" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <Lock className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Data Security</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-6">
                                        <p>
                                            We implement industry-standard security measures to protect your personal information against unauthorized access,
                                            alteration, disclosure, or destruction.
                                        </p>

                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Lock className="text-emerald-600" size={24} />
                                                </div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Encryption</h4>
                                                <p className="text-sm">All data transmissions are encrypted using SSL/TLS protocols</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Shield className="text-emerald-600" size={24} />
                                                </div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Access Control</h4>
                                                <p className="text-sm">Strict access controls and authentication measures</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Database className="text-emerald-600" size={24} />
                                                </div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Storage</h4>
                                                <p className="text-sm">Data stored in secure, monitored cloud infrastructure</p>
                                            </div>
                                        </div>

                                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <AlertTriangle className="text-amber-600 mr-3 mt-1 flex-shrink-0" size={20} />
                                                <div>
                                                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Your Responsibility</h4>
                                                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                                                        Please keep your account credentials secure and report any suspicious activity immediately.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* User Rights */}
                            <section id="user-rights" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <Shield className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Your Rights</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-6">
                                        <p>
                                            You have several rights regarding your personal information. You can exercise these rights by contacting us or
                                            using the tools available in your account settings.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="flex items-start">
                                                    <CheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" size={16} />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">Access</h4>
                                                        <p className="text-sm mt-1">Request access to your personal data</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <CheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" size={16} />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">Correction</h4>
                                                        <p className="text-sm mt-1">Update or correct inaccurate information</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <CheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" size={16} />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">Deletion</h4>
                                                        <p className="text-sm mt-1">Request deletion of your personal data</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-start">
                                                    <CheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" size={16} />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">Portability</h4>
                                                        <p className="text-sm mt-1">Export your data in a portable format</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <CheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" size={16} />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">Restriction</h4>
                                                        <p className="text-sm mt-1">Limit how we process your information</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <CheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" size={16} />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">Objection</h4>
                                                        <p className="text-sm mt-1">Object to certain data processing activities</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Cookies */}
                            <section id="cookies" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <Eye className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Cookies & Tracking</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-6">
                                        <p>
                                            We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide
                                            personalized content and recommendations.
                                        </p>

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Purpose</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                                                </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Essential</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Required for platform functionality</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Session</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Analytics</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Usage analysis and improvements</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2 years</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Preferences</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Remember your settings and preferences</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">1 year</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <p className="text-sm">
                                            You can control cookie settings through your browser preferences or our cookie consent manager.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Children's Privacy */}
                            <section id="children" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <Users className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Children's Privacy</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-4">
                                        <p>
                                            ModGoviya is designed for adult farmers and agricultural professionals. We do not knowingly collect personal
                                            information from children under the age of 18.
                                        </p>
                                        <p>
                                            If we discover that we have inadvertently collected information from a child under 18, we will take immediate
                                            steps to delete such information from our systems.
                                        </p>
                                        <p>
                                            Parents or guardians who believe their child has provided personal information to us should contact us immediately
                                            using the information provided in the Contact section.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Policy Updates */}
                            <section id="updates" className="mb-12">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                    <div className="flex items-center mb-6">
                                        <FileText className="text-emerald-600 mr-3" size={24} />
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Policy Updates</h2>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 space-y-4">
                                        <p>
                                            We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                                            legal requirements, or other factors.
                                        </p>
                                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <FileText className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                                                <div>
                                                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">How We Notify You</h4>
                                                    <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                                                        <li>• Email notifications for significant changes</li>
                                                        <li>• In-app notifications when you next use our platform</li>
                                                        <li>• Updated date at the top of this policy</li>
                                                        <li>• 30-day notice period for material changes</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <p>
                                            Continued use of our platform after any modifications indicates your acceptance of the updated Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Contact Section */}
                            <section id="contact" className="mb-12">
                                <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl shadow-lg p-8 text-white">
                                    <div className="flex items-center mb-6">
                                        <Mail className="text-white mr-3" size={24} />
                                        <h2 className="text-2xl font-bold m-0">Contact Us</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-emerald-100">
                                            If you have any questions about this Privacy Policy, your personal information, or want to exercise your rights,
                                            please don't hesitate to contact us.
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center">
                                                        <Mail size={18} className="mr-3 text-emerald-200" />
                                                        <span className="text-emerald-100">privacy@modgoviya.lk</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Phone size={18} className="mr-3 text-emerald-200" />
                                                        <span className="text-emerald-100">+94 11 234 5678</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MapPin size={18} className="mr-3 text-emerald-200" />
                                                        <span className="text-emerald-100">
                                                            ModGoviya Data Protection Office<br />
                                                            123 Agricultural Center<br />
                                                            Colombo 07, Sri Lanka
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Response Time</h3>
                                                <div className="space-y-3 text-emerald-100">
                                                    <div className="flex items-center">
                                                        <Clock size={18} className="mr-3 text-emerald-200" />
                                                        <span>General inquiries: 24-48 hours</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock size={18} className="mr-3 text-emerald-200" />
                                                        <span>Data requests: 30 days</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock size={18} className="mr-3 text-emerald-200" />
                                                        <span>Security issues: Immediate</span>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <Link
                                                        to="/chatsupport"
                                                        onClick={scrollToTop}
                                                        className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                                                    >
                                                        <MessageSquare size={18} className="mr-2" />
                                                        Live Chat Support
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Final Notice */}
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                                        <Leaf className="text-white w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Thank You for Trusting ModGoviya
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Your privacy is essential to building a stronger agricultural community in Sri Lanka.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                    <button
                                        onClick={scrollToTop}
                                        className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-colors duration-200"
                                    >
                                        <ArrowLeft size={18} className="mr-2" />
                                        Return to Platform
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('overview')}
                                        className="inline-flex items-center px-6 py-2 border border-emerald-600 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200"
                                    >
                                        Back to Top
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-105 z-50"
                aria-label="Back to top"
            >
                ↑
            </button>
        </div>
    );
};

export default PrivacyPolicy;
