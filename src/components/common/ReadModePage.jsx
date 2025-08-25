import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Share2,
    Bookmark,
    Heart,
    MessageCircle,
    ChevronRight,
    Droplets,
    Cloud,
    Leaf,
    Bug,
    Sun,
    Shield,
    Zap,
    CheckCircle,
    AlertTriangle,
    Info
} from 'lucide-react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ReadModePage = () => {
    const [selectedArticle, setSelectedArticle] = useState('monsoon');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    // Simulate reading progress
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            setReadingProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This enables smooth scrolling
        });
    };

    const articles = {
        monsoon: {
            id: 'monsoon',
            title: 'Best Practices for Monsoon Season Farming',
            subtitle: 'Learn how to protect your crops and maximize yield during the rainy season',
            date: 'June 15, 2025',
            readTime: '8 min read',
            author: 'Dr. Priya Sharma',
            authorTitle: 'Agricultural Extension Officer',
            category: 'Seasonal Farming',
            image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            icon: Cloud,
            content: {
                introduction: "The monsoon season brings both opportunities and challenges for farmers. While adequate rainfall is essential for crop growth, excessive water can lead to waterlogging, pest infestations, and crop diseases. This comprehensive guide will help you navigate through the monsoon season successfully.",
                sections: [
                    {
                        title: "Pre-Monsoon Preparation",
                        icon: Shield,
                        points: [
                            "Clean and repair drainage systems in your fields",
                            "Prepare raised beds for sensitive crops",
                            "Stock up on necessary farming supplies and equipment",
                            "Check and maintain farm machinery",
                            "Plan crop rotation based on monsoon predictions"
                        ]
                    },
                    {
                        title: "Crop Selection and Management",
                        icon: Leaf,
                        points: [
                            "Choose monsoon-resistant varieties",
                            "Implement proper spacing to ensure good air circulation",
                            "Use organic mulching to prevent soil erosion",
                            "Monitor soil moisture levels regularly",
                            "Apply appropriate fertilizers before heavy rains"
                        ]
                    },
                    {
                        title: "Water Management Strategies",
                        icon: Droplets,
                        points: [
                            "Install efficient drainage systems",
                            "Create water harvesting structures",
                            "Use drip irrigation during dry spells",
                            "Implement contour farming on slopes",
                            "Monitor weather forecasts for flood warnings"
                        ]
                    },
                    {
                        title: "Disease and Pest Prevention",
                        icon: Bug,
                        points: [
                            "Increase surveillance for early detection",
                            "Use fungicides preventively in humid conditions",
                            "Remove infected plant debris immediately",
                            "Maintain proper plant spacing for air circulation",
                            "Apply neem-based organic pesticides"
                        ]
                    }
                ]
            }
        },
        irrigation: {
            id: 'irrigation',
            title: 'Smart Irrigation Techniques for Water Conservation',
            subtitle: 'Discover modern irrigation methods that save water and increase efficiency',
            date: 'June 12, 2025',
            readTime: '6 min read',
            author: 'Prof. Rajesh Kumar',
            authorTitle: 'Water Management Specialist',
            category: 'Technology',
            image: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            icon: Droplets,
            content: {
                introduction: "Water scarcity is becoming a critical issue for farmers worldwide. Smart irrigation techniques can help you conserve water while maintaining or even increasing crop yields. Learn about the latest water-efficient irrigation methods that can transform your farming practices.",
                sections: [
                    {
                        title: "Drip Irrigation Systems",
                        icon: Zap,
                        points: [
                            "Install drip emitters directly at plant roots",
                            "Use pressure-compensating drippers for uniform water distribution",
                            "Implement automated timers for consistent watering",
                            "Regular maintenance and cleaning of drip lines",
                            "Monitor soil moisture with sensors"
                        ]
                    },
                    {
                        title: "Sprinkler Irrigation Optimization",
                        icon: Sun,
                        points: [
                            "Choose appropriate sprinkler heads for your crop type",
                            "Optimize water pressure for efficient coverage",
                            "Schedule irrigation during early morning hours",
                            "Use wind-resistant sprinkler designs",
                            "Implement zone-based irrigation systems"
                        ]
                    },
                    {
                        title: "Soil Moisture Monitoring",
                        icon: Info,
                        points: [
                            "Install soil moisture sensors at different depths",
                            "Use mobile apps to monitor moisture levels",
                            "Understand your soil's water holding capacity",
                            "Adjust irrigation schedules based on weather forecasts",
                            "Implement deficit irrigation for certain crops"
                        ]
                    },
                    {
                        title: "Water Conservation Techniques",
                        icon: Droplets,
                        points: [
                            "Apply organic mulch to reduce evaporation",
                            "Use cover crops to improve soil water retention",
                            "Collect and reuse agricultural runoff",
                            "Install rainwater harvesting systems",
                            "Choose drought-tolerant crop varieties"
                        ]
                    }
                ]
            }
        },
        pestControl: {
            id: 'pestControl',
            title: 'Organic Pest Control Methods',
            subtitle: 'Natural and effective ways to protect your crops from pests without chemicals',
            date: 'June 10, 2025',
            readTime: '7 min read',
            author: 'Dr. Meera Patel',
            authorTitle: 'Organic Farming Expert',
            category: 'Organic Farming',
            image: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
            icon: Bug,
            content: {
                introduction: "Organic pest control methods are gaining popularity as farmers seek sustainable alternatives to chemical pesticides. These natural approaches not only protect your crops but also preserve beneficial insects and maintain soil health for long-term agricultural sustainability.",
                sections: [
                    {
                        title: "Biological Pest Control",
                        icon: Leaf,
                        points: [
                            "Introduce beneficial insects like ladybugs and lacewings",
                            "Use parasitic wasps for aphid control",
                            "Maintain habitat for natural predators",
                            "Release sterile male pests to disrupt breeding",
                            "Encourage birds and bats for natural pest control"
                        ]
                    },
                    {
                        title: "Natural Pesticide Preparations",
                        icon: Shield,
                        points: [
                            "Neem oil spray for various insect pests",
                            "Garlic and chili pepper solution for aphids",
                            "Soap spray for soft-bodied insects",
                            "Diatomaceous earth for crawling pests",
                            "Essential oil mixtures for repelling insects"
                        ]
                    },
                    {
                        title: "Cultural Control Methods",
                        icon: CheckCircle,
                        points: [
                            "Crop rotation to break pest life cycles",
                            "Companion planting with pest-repelling plants",
                            "Proper sanitation and removal of plant debris",
                            "Optimal planting times to avoid peak pest seasons",
                            "Physical barriers like row covers and traps"
                        ]
                    },
                    {
                        title: "Integrated Pest Management",
                        icon: AlertTriangle,
                        points: [
                            "Regular monitoring and pest identification",
                            "Economic threshold assessment before treatment",
                            "Combination of multiple control methods",
                            "Record keeping for pest patterns",
                            "Education on beneficial vs harmful insects"
                        ]
                    }
                ]
            }
        }
    };

    const currentArticle = articles[selectedArticle];
    const otherArticles = Object.values(articles).filter(article => article.id !== selectedArticle);

    const ArticleSelector = () => (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose an Article to Read:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.values(articles).map((article) => (
                    <button
                        key={article.id}
                        onClick={() => setSelectedArticle(article.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                            selectedArticle === article.id
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-green-300 bg-white dark:bg-gray-800'
                        }`}
                    >
                        <div className="flex items-center mb-2">
                            <article.icon className="w-5 h-5 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-600">{article.category}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{article.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{article.date}</p>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
                <div
                    className="h-full bg-green-600 transition-all duration-150 ease-out"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Header */}
            <Header />

            <div className=" mx-auto px-4 py-24">
                <ArticleSelector />

                {/* Article Header */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="relative h-64 md:h-80" style={{ background: currentArticle.image }}>
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <currentArticle.icon className="w-16 h-16 text-white opacity-80" />
                        </div>
                        <div className="absolute top-4 left-4">
                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {currentArticle.category}
                            </span>
                        </div>
                    </div>

                    <div className="p-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {currentArticle.title}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                            {currentArticle.subtitle}
                        </p>

                        {/* Article Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                <span>{currentArticle.author}, {currentArticle.authorTitle}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{currentArticle.date}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>{currentArticle.readTime}</span>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
                                {currentArticle.content.introduction}
                            </p>

                            {currentArticle.content.sections.map((section, index) => (
                                <div key={index} className="mb-10">
                                    <div className="flex items-center mb-6">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-4">
                                            <section.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {section.title}
                                        </h2>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6">
                                        <ul className="space-y-3">
                                            {section.points.map((point, pointIndex) => (
                                                <li key={pointIndex} className="flex items-start">
                                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700 dark:text-gray-300">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}

                            {/* Call to Action */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg p-8 mt-10">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    Ready to Implement These Techniques?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Join thousands of farmers who have transformed their farming practices with ModGoviya's expert guidance and community support.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to ="/community">
                                    <button
                                        onClick={scrollToTop}
                                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                        Join Our Community
                                    </button>
                                    </Link>
                                    <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                                        Get Expert Consultation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Article Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    isLiked ? 'text-red-600 bg-red-50 dark:bg-red-900/20' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                <span>{isLiked ? 'Liked' : 'Like'}</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <MessageCircle className="w-5 h-5" />
                                <span>Comment</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {Math.round(readingProgress)}% completed
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        More Articles You Might Like
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {otherArticles.map((article) => (
                            <button
                                key={article.id}
                                onClick={() => setSelectedArticle(article.id)}
                                className="text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors group"
                            >
                                <div className="flex items-center mb-2">
                                    <article.icon className="w-4 h-4 text-green-600 mr-2" />
                                    <span className="text-sm text-green-600">{article.category}</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                                    {article.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {article.subtitle}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                                    <span>{article.date}</span>
                                    <span className="mx-2">•</span>
                                    <span>{article.readTime}</span>
                                    <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReadModePage;
