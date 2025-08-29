import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Calendar,
    Shield,
    Users,
    AlertTriangle,
    Scale,
    FileText,
    Leaf,
    ChevronRight,
    Download,
    Printer,
    Share2
} from 'lucide-react';
import Footer from "../layout/Footer";

const TermsAndConditions = () => {
    const [activeSection, setActiveSection] = useState('');
    const [lastUpdated] = useState('January 15, 2025');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('[data-section]');
            let currentSection = '';

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section.getAttribute('data-section');
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
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const sections = [
        { id: 'acceptance', title: 'Acceptance of Terms', icon: Shield },
        { id: 'services', title: 'Our Services', icon: Leaf },
        { id: 'registration', title: 'User Registration', icon: Users },
        { id: 'conduct', title: 'User Conduct', icon: Scale },
        { id: 'content', title: 'Content & Intellectual Property', icon: FileText },
        { id: 'marketplace', title: 'Marketplace Terms', icon: ChevronRight },
        { id: 'weather', title: 'Weather & Advisory Services', icon: AlertTriangle },
        { id: 'privacy', title: 'Privacy & Data Protection', icon: Shield },
        { id: 'liability', title: 'Limitation of Liability', icon: Scale },
        { id: 'termination', title: 'Termination', icon: AlertTriangle },
        { id: 'governing', title: 'Governing Law', icon: Scale },
        { id: 'contact', title: 'Contact Information', icon: Users }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                <span>Back to Home</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Download className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Printer className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Scale className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
                    <p className="text-xl text-green-100 mb-2">ModGoviya Agriculture Platform</p>
                    <div className="flex items-center justify-center text-green-200">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Last updated: {lastUpdated}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Table of Contents - Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
                            <nav className="space-y-2">
                                {sections.map((section) => {
                                    const IconComponent = section.icon;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full text-left flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                                                activeSection === section.id
                                                    ? 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-l-2 border-green-500'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <IconComponent className="w-4 h-4 mr-3" />
                                            <span>{section.title}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
                            {/* Introduction */}
                            <div className="mb-12">
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Welcome to ModGoviya, Sri Lanka's premier digital agriculture platform. These Terms and Conditions ("Terms") govern your access to and use of our services, including our website, mobile applications, marketplace, weather services, and community features.
                                </p>
                            </div>

                            {/* Section 1: Acceptance of Terms */}
                            <section id="acceptance" data-section="acceptance" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <Shield className="w-6 h-6 mr-3 text-green-600" />
                                    1. Acceptance of Terms
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>By accessing or using ModGoviya's services, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use our services.</p>
                                    <p>These Terms apply to all users of ModGoviya, including farmers, buyers, sellers, agricultural advisors, and general visitors to our platform.</p>
                                </div>
                            </section>

                            {/* Section 2: Our Services */}
                            <section id="services" data-section="services" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <Leaf className="w-6 h-6 mr-3 text-green-600" />
                                    2. Our Services
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>ModGoviya provides the following services:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Agricultural Marketplace:</strong> A platform connecting farmers with buyers for direct sales of agricultural products</li>
                                        <li><strong>Weather Services:</strong> Real-time weather updates, forecasts, and agricultural advisories</li>
                                        <li><strong>Community Forum:</strong> A space for farmers to share knowledge, ask questions, and connect with peers</li>
                                        <li><strong>Educational Resources:</strong> Farming guides, tutorials, and best practices</li>
                                        <li><strong>Expert Consultation:</strong> Access to agricultural experts and advisors</li>
                                        <li><strong>Technology Integration:</strong> IoT sensors, crop monitoring, and smart farming solutions</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 3: User Registration */}
                            <section id="registration" data-section="registration" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <Users className="w-6 h-6 mr-3 text-green-600" />
                                    3. User Registration and Accounts
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <h3 className="text-xl font-semibold mb-3">3.1 Account Creation</h3>
                                    <p>To access certain features, you must create an account by providing accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials.</p>

                                    <h3 className="text-xl font-semibold mb-3">3.2 User Categories</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Farmers:</strong> Must provide valid agricultural registration or proof of farming activities</li>
                                        <li><strong>Buyers:</strong> Must provide valid business registration for commercial purchases</li>
                                        <li><strong>Agricultural Experts:</strong> Must provide relevant qualifications and certifications</li>
                                    </ul>

                                    <h3 className="text-xl font-semibold mb-3">3.3 Account Security</h3>
                                    <p>You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.</p>
                                </div>
                            </section>

                            {/* Section 4: User Conduct */}
                            <section id="conduct" data-section="conduct" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <Scale className="w-6 h-6 mr-3 text-green-600" />
                                    4. User Conduct
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>You agree not to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Post false, misleading, or fraudulent product information</li>
                                        <li>Engage in price manipulation or unfair trading practices</li>
                                        <li>Use the platform for illegal activities or to sell prohibited items</li>
                                        <li>Harass, abuse, or harm other users</li>
                                        <li>Violate any applicable laws or regulations</li>
                                        <li>Upload malicious software or attempt to compromise platform security</li>
                                        <li>Create multiple accounts to circumvent restrictions</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 5: Content & Intellectual Property */}
                            <section id="content" data-section="content" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <FileText className="w-6 h-6 mr-3 text-green-600" />
                                    5. Content & Intellectual Property
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <h3 className="text-xl font-semibold mb-3">5.1 User Content</h3>
                                    <p>You retain ownership of content you post but grant ModGoviya a license to use, modify, and display such content in connection with our services.</p>

                                    <h3 className="text-xl font-semibold mb-3">5.2 Platform Content</h3>
                                    <p>All ModGoviya content, including but not limited to text, graphics, logos, software, and educational materials, is owned by ModGoviya and protected by intellectual property laws.</p>

                                    <h3 className="text-xl font-semibold mb-3">5.3 Agricultural Data</h3>
                                    <p>Weather data, market prices, and agricultural advisories are provided for informational purposes. While we strive for accuracy, we cannot guarantee the completeness or accuracy of such data.</p>
                                </div>
                            </section>

                            {/* Section 6: Marketplace Terms */}
                            <section id="marketplace" data-section="marketplace" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <ChevronRight className="w-6 h-6 mr-3 text-green-600" />
                                    6. Marketplace Terms
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <h3 className="text-xl font-semibold mb-3">6.1 Product Listings</h3>
                                    <p>Sellers must provide accurate product descriptions, quality grades, quantities, and pricing. All agricultural products must comply with Sri Lankan food safety regulations.</p>

                                    <h3 className="text-xl font-semibold mb-3">6.2 Transactions</h3>
                                    <p>ModGoviya facilitates connections between buyers and sellers but is not a party to the actual transactions. Payment terms, delivery arrangements, and dispute resolution are primarily between the transacting parties.</p>

                                    <h3 className="text-xl font-semibold mb-3">6.3 Quality Assurance</h3>
                                    <p>Sellers are responsible for ensuring product quality matches descriptions. Buyers have the right to inspect products upon delivery and report quality issues within 24 hours.</p>

                                    <h3 className="text-xl font-semibold mb-3">6.4 Commission and Fees</h3>
                                    <p>ModGoviya charges a small commission on completed transactions to maintain platform operations. Current fee structure is available on our pricing page.</p>
                                </div>
                            </section>

                            {/* Section 7: Weather & Advisory Services */}
                            <section id="weather" data-section="weather" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <AlertTriangle className="w-6 h-6 mr-3 text-green-600" />
                                    7. Weather & Advisory Services
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>Weather forecasts and agricultural advisories are provided for informational purposes only. Users should:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Use weather information as guidance, not absolute predictions</li>
                                        <li>Consult multiple sources for critical farming decisions</li>
                                        <li>Understand that weather predictions may be inaccurate</li>
                                        <li>Take appropriate risk mitigation measures</li>
                                    </ul>
                                    <p>ModGoviya is not liable for decisions made based on weather forecasts or agricultural advisories.</p>
                                </div>
                            </section>

                            {/* Section 8: Privacy & Data Protection */}
                            <section id="privacy" data-section="privacy" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <Shield className="w-6 h-6 mr-3 text-green-600" />
                                    8. Privacy & Data Protection
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>Your privacy is important to us. Our Privacy Policy, incorporated by reference into these Terms, describes how we collect, use, and protect your personal information.</p>
                                    <p>By using ModGoviya, you consent to the collection and use of your information as described in our Privacy Policy.</p>
                                </div>
                            </section>

                            {/* Section 9: Limitation of Liability */}
                            <section id="liability" data-section="liability" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <Scale className="w-6 h-6 mr-3 text-green-600" />
                                    9. Limitation of Liability
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <h3 className="text-xl font-semibold mb-3">9.1 Service Availability</h3>
                                    <p>We strive to maintain continuous service availability but cannot guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance, technical issues, or force majeure events.</p>

                                    <h3 className="text-xl font-semibold mb-3">9.2 Agricultural Risks</h3>
                                    <p>ModGoviya is not liable for agricultural losses, crop failures, market fluctuations, or weather-related damages. Users acknowledge that farming involves inherent risks.</p>

                                    <h3 className="text-xl font-semibold mb-3">9.3 Third-Party Services</h3>
                                    <p>We may integrate with third-party services (payment processors, weather providers, logistics partners). We are not responsible for their performance or failures.</p>
                                </div>
                            </section>

                            {/* Section 10: Termination */}
                            <section id="termination" data-section="termination" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <AlertTriangle className="w-6 h-6 mr-3 text-green-600" />
                                    10. Termination
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>Either party may terminate these Terms at any time. ModGoviya reserves the right to suspend or terminate accounts for violations of these Terms or applicable laws.</p>
                                    <p>Upon termination, your right to use ModGoviya services ceases immediately. Certain provisions of these Terms will survive termination, including intellectual property rights and limitation of liability clauses.</p>
                                </div>
                            </section>

                            {/* Section 11: Governing Law */}
                            <section id="governing" data-section="governing" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <Scale className="w-6 h-6 mr-3 text-green-600" />
                                    11. Governing Law
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>These Terms are governed by the laws of Sri Lanka. Any disputes arising from these Terms or your use of ModGoviya services shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.</p>
                                    <p>We encourage users to resolve disputes through direct communication or mediation before pursuing legal action.</p>
                                </div>
                            </section>

                            {/* Section 12: Contact Information */}
                            <section id="contact" data-section="contact" className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <Users className="w-6 h-6 mr-3 text-green-600" />
                                    12. Contact Information
                                </h2>
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <p>For questions about these Terms or our services, please contact us:</p>
                                    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg mt-4">
                                        <p className="mb-2"><strong>ModGoviya Legal Team</strong></p>
                                        <p className="mb-1">Email: legal@modgoviya.lk</p>
                                        <p className="mb-1">Phone: +94 11 234 5678</p>
                                        <p className="mb-1">Address: Colombo, Sri Lanka</p>
                                        <p>Website: www.modgoviya.lk</p>
                                    </div>
                                </div>
                            </section>

                            {/* Updates Notice */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
                                <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Notice</h3>
                                    <p className="text-amber-700 dark:text-amber-300">
                                        These Terms may be updated from time to time. We will notify users of significant changes via email or platform notifications. Continued use of ModGoviya after changes constitutes acceptance of the updated Terms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-gray-100 dark:bg-gray-800 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Ready to Transform Your Farm?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Join thousands of Sri Lankan farmers using ModGoviya to grow their agricultural business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.open('/register', '_blank')}
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all duration-200 font-medium"
                        >
                            Get Started Today
                        </button>
                        <button
                            onClick={() => window.open('/contact', '_blank')}
                            className="px-6 py-3 border border-green-600 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 transition-all duration-200 font-medium"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
