import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Sprout,
    Cloud,
    ShoppingCart,
    Calendar,
    Bug,
    Users,
    BookOpen,
    Bell,
    Globe,
    BarChart3,
    ArrowRight,
    Check,
    Star
} from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const FeaturesPage = () => {
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const features = [
        {
            id: 1,
            icon: Sprout,
            title: "Crop Management",
            description: "Comprehensive crop tracking with planting schedules, harvest dates, and health monitoring for maximum yield optimization.",
            benefits: ["Track multiple crops", "Health monitoring", "Yield prediction"],
            color: "from-green-400 to-emerald-600"
        },
        {
            id: 2,
            icon: Cloud,
            title: "Weather Forecast",
            description: "Real-time weather data with 7-day forecasts, rainfall predictions, and severe weather alerts tailored for your location.",
            benefits: ["Hourly updates", "Storm alerts", "Irrigation planning"],
            color: "from-blue-400 to-cyan-600"
        },
        {
            id: 3,
            icon: ShoppingCart,
            title: "Farming Marketplace",
            description: "Connect with local buyers and sellers for seeds, tools, equipment, and fresh produce with secure transaction support.",
            benefits: ["Local connections", "Secure payments", "Quality assurance"],
            color: "from-purple-400 to-indigo-600"
        },
        {
            id: 4,
            icon: Calendar,
            title: "Task Scheduler",
            description: "Smart scheduling system with automated reminders for planting, watering, fertilizing, and harvesting activities.",
            benefits: ["Smart reminders", "Task automation", "Calendar sync"],
            color: "from-orange-400 to-red-600"
        },
        {
            id: 5,
            icon: Bug,
            title: "Pest & Disease Control",
            description: "AI-powered pest identification through image upload with treatment recommendations and prevention strategies.",
            benefits: ["AI identification", "Treatment plans", "Prevention tips"],
            color: "from-red-400 to-pink-600"
        },
        {
            id: 6,
            icon: Users,
            title: "Community Forum",
            description: "Connect with fellow farmers, share experiences, ask questions, and learn from agricultural experts worldwide.",
            benefits: ["Expert advice", "Peer support", "Knowledge sharing"],
            color: "from-teal-400 to-green-600"
        },
        {
            id: 7,
            icon: BookOpen,
            title: "Farming Resources",
            description: "Access comprehensive guides, modern farming techniques, organic methods, and latest agricultural research.",
            benefits: ["Expert articles", "Video tutorials", "Research updates"],
            color: "from-amber-400 to-orange-600"
        },
        {
            id: 8,
            icon: Bell,
            title: "Smart Notifications",
            description: "Intelligent alert system for weather changes, task reminders, marketplace deals, and community updates.",
            benefits: ["Custom alerts", "Priority filtering", "Multi-channel delivery"],
            color: "from-pink-400 to-rose-600"
        },
        {
            id: 9,
            icon: Globe,
            title: "Multi-language Support",
            description: "Full platform support in Sinhala, Tamil, and English to serve Sri Lankan farming communities effectively.",
            benefits: ["3 languages", "Cultural adaptation", "Local context"],
            color: "from-indigo-400 to-purple-600"
        },
        {
            id: 10,
            icon: BarChart3,
            title: "Analytics & Insights",
            description: "Detailed reports on crop performance, productivity trends, weather patterns, and financial analytics.",
            benefits: ["Performance metrics", "Trend analysis", "ROI tracking"],
            color: "from-cyan-400 to-blue-600"
        }
    ];

    const stats = [
        { number: "50K+", label: "Active Farmers" },
        { number: "95%", label: "Crop Success Rate" },
        { number: "24/7", label: "Support Available" },
        { number: "10+", label: "Languages Supported" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
            {/* Hero Section */}
            <Header />

            <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 pt-8">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
                            <Star className="w-5 h-5 text-yellow-300" />
                            <span className="text-white font-medium">Trusted by 50,000+ Farmers</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Powerful Features for
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Modern Farming
              </span>
                        </h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
                            Discover comprehensive tools and services designed to revolutionize your farming experience
                            with cutting-edge technology and community support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                                Get Started Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                            <Link to="/watchdemo"
                                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300">
                                Watch Demo
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-xl border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Everything You Need to
                        <span className="block text-green-600">Grow Successfully</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our comprehensive platform provides all the tools, insights, and community support
                        you need to transform your farming operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                                onMouseEnter={() => setHoveredFeature(feature.id)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg`}>
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                                <div className="space-y-2 mb-6">
                                    {feature.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-700">
                                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            {benefit}
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-3 px-4 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                                    Learn More
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Integration Section */}
            <div className="bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Seamless Integration with Your Workflow
                            </h2>
                            <p className="text-gray-300 text-lg mb-8">
                                ModGoviya integrates perfectly with your existing farming practices,
                                enhancing productivity without disrupting established routines.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-300">
                                    <Check className="w-6 h-6 text-green-400 mr-3" />
                                    Mobile-first design for field use
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Check className="w-6 h-6 text-green-400 mr-3" />
                                    Offline functionality for remote areas
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Check className="w-6 h-6 text-green-400 mr-3" />
                                    Real-time data synchronization
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Check className="w-6 h-6 text-green-400 mr-3" />
                                    Multi-device accessibility
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-1">
                                <div className="bg-gray-900 rounded-3xl p-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        {features.slice(0, 4).map((feature, index) => {
                                            const IconComponent = feature.icon;
                                            return (
                                                <div key={index} className="bg-gray-800 rounded-xl p-4 text-center">
                                                    <IconComponent className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                                    <div className="text-white text-sm font-medium">{feature.title}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-20">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Farming Journey?
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                        Join thousands of successful farmers who trust ModGoviya to enhance their productivity and profitability.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                            Start Free Trial
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <Link
                            to="/schedule"
                              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300">
                            Schedule Demo
                        </Link>
                    </div>
                    <div className="mt-8 text-green-100">
                        <p>✓ No credit card required  ✓ 30-day free trial  ✓ Cancel anytime</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FeaturesPage;
