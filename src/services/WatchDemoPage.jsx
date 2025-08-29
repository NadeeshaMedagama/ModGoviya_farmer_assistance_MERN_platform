import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Users,
    Star,
    ArrowRight,
    CheckCircle,
    Clock,
    BarChart3,
    Sprout,
    Cloud,
    ShoppingCart,
    Phone,
    MessageCircle,
    Award,
    TrendingUp,
    Shield,
    Zap
} from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useTheme } from '../contexts/ThemeContext'; // Adjust path as needed

const WatchDemoPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [duration] = useState(0);
    const [selectedDemo, setSelectedDemo] = useState(0);
    const [activeFeature, setActiveFeature] = useState(0);
    const videoRef = useRef(null);
    const { isDarkMode } = useTheme(); // Get theme context

    const demoVideos = [
        {
            id: 0,
            title: "Complete Platform Overview",
            description: "See how ModGoviya transforms farming operations",
            duration: "12:45",
            thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=450&fit=crop",
            category: "Overview"
        },
        {
            id: 1,
            title: "Crop Management System",
            description: "Track, monitor, and optimize your crops",
            duration: "8:32",
            thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=450&fit=crop",
            category: "Features"
        },
        {
            id: 2,
            title: "Weather Intelligence",
            description: "Real-time weather data and forecasting",
            duration: "6:18",
            thumbnail: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=800&h=450&fit=crop",
            category: "Features"
        },
        {
            id: 3,
            title: "Marketplace & Trading",
            description: "Connect with buyers and sellers efficiently",
            duration: "10:25",
            thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
            category: "Features"
        }
    ];

    const keyFeatures = [
        {
            icon: Sprout,
            title: "Smart Crop Management",
            description: "AI-powered crop monitoring with real-time health insights",
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: Cloud,
            title: "Weather Intelligence",
            description: "Hyperlocal weather forecasts with farming recommendations",
            color: "from-blue-500 to-cyan-600"
        },
        {
            icon: BarChart3,
            title: "Analytics Dashboard",
            description: "Comprehensive insights and performance metrics",
            color: "from-purple-500 to-indigo-600"
        },
        {
            icon: ShoppingCart,
            title: "Integrated Marketplace",
            description: "Direct access to buyers, sellers, and suppliers",
            color: "from-orange-500 to-red-600"
        }
    ];

    const testimonials = [
        {
            name: "Kumara Perera",
            role: "Rice Farmer, Polonnaruwa",
            rating: 5,
            comment: "ModGoviya increased my harvest yield by 35% in just one season. The weather alerts saved my crops multiple times.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
        },
        {
            name: "Sunitha Fernando",
            role: "Vegetable Farmer, Nuwara Eliya",
            rating: 5,
            comment: "The marketplace feature helped me connect directly with buyers. My income has doubled since using this platform.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
        },
        {
            name: "Ranjith Silva",
            role: "Tea Plantation Owner, Kandy",
            rating: 5,
            comment: "Comprehensive analytics and pest management features are game-changers. Highly recommend to all farmers.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
        }
    ];

    const stats = [
        { icon: Users, number: "50,000+", label: "Active Farmers", color: "text-blue-600" },
        { icon: TrendingUp, number: "35%", label: "Average Yield Increase", color: "text-green-600" },
        { icon: Award, number: "95%", label: "Customer Satisfaction", color: "text-purple-600" },
        { icon: Shield, number: "24/7", label: "Expert Support", color: "text-orange-600" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % keyFeatures.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-green-50 to-blue-50'}`}>
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 pt-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                            <Play className="w-5 h-5 text-yellow-300" />
                            <span className="text-white font-medium">Watch Demo Videos</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            See ModGoviya in
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                Action
                            </span>
                        </h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            Discover how our comprehensive farming platform transforms agricultural operations
                            with real-world demonstrations and success stories.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Video Player */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-3xl shadow-2xl overflow-hidden border`}>
                    <div className="relative aspect-video bg-gray-900">
                        <img
                            src={demoVideos[selectedDemo].thumbnail}
                            alt="Demo video thumbnail"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center">
                                <button
                                    onClick={handlePlayPause}
                                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                                >
                                    <Play className="w-10 h-10 text-white ml-1" />
                                </button>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {demoVideos[selectedDemo].title}
                                </h3>
                                <p className="text-gray-200 text-lg">
                                    {demoVideos[selectedDemo].description}
                                </p>
                            </div>
                        </div>

                        {/* Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handlePlayPause}
                                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                                </button>
                                <button
                                    onClick={toggleMute}
                                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                                </button>
                                <div className="flex-1 bg-white/20 rounded-full h-2">
                                    <div className="bg-green-400 h-2 rounded-full w-1/3"></div>
                                </div>
                                <span className="text-white text-sm">{demoVideos[selectedDemo].duration}</span>
                                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <Maximize className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                                    {demoVideos[selectedDemo].title}
                                </h2>
                                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg mb-4`}>
                                    {demoVideos[selectedDemo].description}
                                </p>
                                <div className={`flex items-center space-x-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {demoVideos[selectedDemo].duration}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        12.5K views
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                        4.9 rating
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 flex space-x-3">
                                <Link to="/freetrial">
                                    <button className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors">
                                        <ArrowRight className="w-4 h-4 mr-2" />
                                        Start Free Trial
                                    </button>
                                </Link>
                                <Link to="/contact">
                                    <button className={`flex items-center px-6 py-3 border ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} font-medium rounded-xl transition-colors`}>
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact Sales
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Video Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                        Explore All Demo Videos
                    </h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
                        Get a comprehensive understanding of ModGoviya's capabilities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {demoVideos.map((video) => (
                        <div
                            key={video.id}
                            onClick={() => setSelectedDemo(video.id)}
                            className={`cursor-pointer group relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                                selectedDemo === video.id ? 'ring-2 ring-green-500' : ''
                            }`}
                        >
                            <div className="relative aspect-video">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <Play className="w-6 h-6 text-white ml-0.5" />
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3">
                                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                        {video.category}
                                    </span>
                                </div>
                                <div className="absolute bottom-3 right-3">
                                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                        {video.duration}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className={`font-semibold ${isDarkMode ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} transition-colors mb-2`}>
                                    {video.title}
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {video.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Features Showcase */}
            <div className="bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            See Features in Action
                        </h2>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            Experience how each feature transforms your farming operations with real demonstrations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            {keyFeatures.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                            activeFeature === index
                                                ? 'bg-white/10 border-green-400'
                                                : 'bg-white/5 border-gray-600 hover:bg-white/8'
                                        }`}
                                        onClick={() => setActiveFeature(index)}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-white mb-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-gray-300">
                                                    {feature.description}
                                                </p>
                                            </div>
                                            <CheckCircle
                                                className={`w-6 h-6 transition-all duration-300 ${
                                                    activeFeature === index ? 'text-green-400' : 'text-gray-600'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-1">
                                <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-3xl p-8 min-h-96`}>
                                    <div className="text-center">
                                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${keyFeatures[activeFeature].color} mb-6`}>
                                            {React.createElement(keyFeatures[activeFeature].icon, {
                                                className: "w-12 h-12 text-white"
                                            })}
                                        </div>
                                        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                                            {keyFeatures[activeFeature].title}
                                        </h3>
                                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                                            {keyFeatures[activeFeature].description}
                                        </p>
                                        <button className={`inline-flex items-center px-6 py-3 ${isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'} font-medium rounded-xl transition-colors`}>
                                            <Play className="w-4 h-4 mr-2" />
                                            Watch Feature Demo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Stories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                        Success Stories from Real Farmers
                    </h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg max-w-3xl mx-auto`}>
                        Hear from farmers who have transformed their operations with ModGoviya
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-8 shadow-lg border`}>
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                ))}
                            </div>
                            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic`}>"{testimonial.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                                    <div className="text-green-100 font-medium">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-gradient-to-r from-gray-900 to-green-900 rounded-3xl p-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of successful farmers who trust ModGoviya to enhance their productivity and profitability.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link to="/freetrial">
                            <button className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                                <Zap className="w-5 h-5 mr-2" />
                                Start Free Trial
                            </button>
                        </Link>
                        <Link to="/schedule">
                            <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300">
                                <Phone className="w-5 h-5 mr-2" />
                                Schedule Demo Call
                            </button>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            No credit card required
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            30-day free trial
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            Cancel anytime
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default WatchDemoPage;
