import React, { useState } from 'react';
import {
    ArrowRight,
    Package,
    Cloud,
    ShoppingCart,
    MessageCircle,
    Calendar,
    BookOpen,
    TrendingUp,
    Users,
    Bell,
    MapPin,
    Camera,
    BarChart3,
    Smartphone,
    Globe,
    Shield,
    Zap,
    Play,
    CheckCircle
} from 'lucide-react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const BrowseFeaturesPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Features', count: 12 },
        { id: 'management', name: 'Crop Management', count: 4 },
        { id: 'community', name: 'Community', count: 3 },
        { id: 'technology', name: 'Technology', count: 3 },
        { id: 'business', name: 'Business Tools', count: 2 }
    ];

    const allFeatures = [
        {
            id: 1,
            category: 'management',
            icon: Package,
            title: "Advanced Crop Management",
            subtitle: "Complete crop lifecycle tracking",
            description: "Monitor your crops from seed to harvest with detailed analytics, growth tracking, and automated reminders for optimal care.",
            features: ["Crop lifecycle tracking", "Growth analytics", "Disease monitoring", "Harvest planning"],
            image: "bg-gradient-to-br from-green-400 to-emerald-600",
            badge: "Most Popular"
        },
        {
            id: 2,
            category: 'technology',
            icon: Cloud,
            title: "AI-Powered Weather Forecasting",
            subtitle: "Hyper-local weather predictions",
            description: "Get precise weather forecasts tailored to your exact location with AI-driven predictions for better crop planning.",
            features: ["7-day forecasts", "Rain predictions", "Temperature alerts", "Humidity tracking"],
            image: "bg-gradient-to-br from-blue-400 to-cyan-600",
            badge: "New"
        },
        {
            id: 3,
            category: 'business',
            icon: ShoppingCart,
            title: "Digital Marketplace",
            subtitle: "Connect buyers and sellers",
            description: "Trade farming products directly with verified buyers and sellers in a secure digital marketplace.",
            features: ["Secure payments", "Quality assurance", "Price tracking", "Bulk orders"],
            image: "bg-gradient-to-br from-purple-400 to-pink-600",
            badge: "Featured"
        },
        {
            id: 4,
            category: 'community',
            icon: MessageCircle,
            title: "Farmer Community Hub",
            subtitle: "Knowledge sharing platform",
            description: "Connect with thousands of farmers, share experiences, and get expert advice from agricultural professionals.",
            features: ["Discussion forums", "Expert Q&A", "Knowledge base", "Local groups"],
            image: "bg-gradient-to-br from-orange-400 to-red-600"
        },
        {
            id: 5,
            category: 'management',
            icon: Calendar,
            title: "Smart Task Scheduler",
            subtitle: "Never miss farming activities",
            description: "Intelligent scheduling system that reminds you of important farming tasks based on crop types and weather conditions.",
            features: ["Custom reminders", "Weather-based alerts", "Seasonal planning", "Task automation"],
            image: "bg-gradient-to-br from-indigo-400 to-purple-600"
        },
        {
            id: 6,
            category: 'technology',
            icon: BookOpen,
            title: "Digital Farming Library",
            subtitle: "Modern farming knowledge",
            description: "Access comprehensive guides, tutorials, and best practices for modern farming techniques.",
            features: ["Video tutorials", "Step-by-step guides", "Expert articles", "Downloadable resources"],
            image: "bg-gradient-to-br from-teal-400 to-blue-600"
        },
        {
            id: 7,
            category: 'management',
            icon: TrendingUp,
            title: "Yield Analytics",
            subtitle: "Data-driven insights",
            description: "Analyze your farming performance with detailed reports and predictive analytics for better decision making.",
            features: ["Performance tracking", "Yield predictions", "Profit analysis", "Comparison reports"],
            image: "bg-gradient-to-br from-yellow-400 to-orange-600"
        },
        {
            id: 8,
            category: 'community',
            icon: Users,
            title: "Expert Consultation",
            subtitle: "Professional guidance",
            description: "Get personalized advice from certified agricultural experts and extension officers.",
            features: ["1-on-1 consultations", "Certified experts", "Problem diagnosis", "Treatment recommendations"],
            image: "bg-gradient-to-br from-pink-400 to-rose-600"
        },
        {
            id: 9,
            category: 'technology',
            icon: Bell,
            title: "Smart Notifications",
            subtitle: "Timely alerts & reminders",
            description: "Receive intelligent notifications about weather changes, market prices, and farming activities.",
            features: ["Weather alerts", "Price notifications", "Task reminders", "Emergency warnings"],
            image: "bg-gradient-to-br from-lime-400 to-green-600"
        },
        {
            id: 10,
            category: 'management',
            icon: MapPin,
            title: "Farm Mapping",
            subtitle: "GPS-based field management",
            description: "Map your fields with GPS technology and manage different plots with precision agriculture techniques.",
            features: ["GPS mapping", "Field boundaries", "Crop zoning", "Irrigation planning"],
            image: "bg-gradient-to-br from-emerald-400 to-teal-600"
        },
        {
            id: 11,
            category: 'business',
            icon: BarChart3,
            title: "Financial Management",
            subtitle: "Track expenses & profits",
            description: "Comprehensive financial tracking for your farming operations with expense management and profit analysis.",
            features: ["Expense tracking", "Profit calculations", "Budget planning", "Financial reports"],
            image: "bg-gradient-to-br from-violet-400 to-purple-600"
        },
        {
            id: 12,
            category: 'community',
            icon: Camera,
            title: "Crop Disease Detection",
            subtitle: "AI-powered diagnosis",
            description: "Take photos of your crops to get instant AI-powered disease detection and treatment recommendations.",
            features: ["Instant diagnosis", "Treatment guides", "Disease prevention", "Expert verification"],
            image: "bg-gradient-to-br from-rose-400 to-pink-600",
            badge: "AI Powered"
        }
    ];

    const filteredFeatures = activeCategory === 'all'
        ? allFeatures
        : allFeatures.filter(feature => feature.category === activeCategory);

    const stats = [
        { number: "10,000+", label: "Active Users", icon: Users },
        { number: "25%", label: "Avg. Yield Increase", icon: TrendingUp },
        { number: "500+", label: "Villages Covered", icon: MapPin },
        { number: "99.9%", label: "Uptime", icon: Shield }
    ];

    const benefits = [
        {
            icon: Smartphone,
            title: "Mobile First",
            description: "Optimized for smartphones with offline capabilities"
        },
        {
            icon: Globe,
            title: "Multi-Language",
            description: "Support for Sinhala, Tamil, and English languages"
        },
        {
            icon: Shield,
            title: "Secure & Reliable",
            description: "Bank-level security with 99.9% uptime guarantee"
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Optimized performance even on slow internet connections"
        }
    ];

    const handleNavClick = (href) => {
        // In a real app, this would use React Router navigation
        console.log(`Navigate to: ${href}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Navigation */}
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-green-600 to-emerald-600 py-20 mt-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Powerful Features for Modern Farming
                    </h1>
                    <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                        Discover comprehensive tools designed to revolutionize your farming experience and maximize your agricultural success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                            <Play size={20} className="mr-2" />
                            Watch Demo
                        </button>
                        <button
                            onClick={() => handleNavClick('/cropmanage')}
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                        >
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <stat.icon className="text-green-600" size={24} />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                    activeCategory === category.id
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {category.name}
                                <span className="ml-2 text-sm opacity-75">({category.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredFeatures.map((feature) => (
                            <div key={feature.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                                {feature.badge && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                            {feature.badge}
                                        </span>
                                    </div>
                                )}

                                <div className={`h-48 ${feature.image} relative`}>
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                            <feature.icon className="text-white" size={24} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-green-600 text-sm font-medium mb-3">{feature.subtitle}</p>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>

                                    <div className="space-y-2 mb-6">
                                        {feature.features.map((item, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <CheckCircle size={16} className="text-green-600 mr-2 flex-shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                                        Learn More
                                        <ArrowRight size={16} className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Benefits */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose ModGoviya Platform?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Built with cutting-edge technology and designed specifically for Sri Lankan farmers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all">
                                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="text-green-600" size={28} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Farming?
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                        Join thousands of farmers who are already using ModGoviya to increase their yields and profits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => handleNavClick('/cropmanage')}
                            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Start Your Free Trial
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                            Schedule Demo
                        </button>
                    </div>
                    <p className="text-green-100 mt-4 text-sm">
                        No credit card required • 30-day free trial • Cancel anytime
                    </p>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default BrowseFeaturesPage;
