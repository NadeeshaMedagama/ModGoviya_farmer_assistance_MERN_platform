import React, { useState } from 'react';
import {
    BookOpen,
    Sprout,
    PlayCircle,
    HelpCircle,
    MessageSquare,
    Search,
    Calendar,
    User,
    Eye,
    Clock,
    ArrowRight,
    Leaf,
    Tractor,
    Cloud,
    BarChart3,
    Users,
    Phone,
    Mail,
    ChevronRight,
    Star,
    Download,
    Video
} from 'lucide-react';

const ResourcesHub = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const blogPosts = [
        {
            id: 1,
            title: "Smart Irrigation: Revolutionizing Water Management in Sri Lankan Agriculture",
            excerpt: "Learn how modern irrigation techniques can increase crop yield while conserving water resources.",
            author: "Dr. Kumara Silva",
            date: "2025-08-25",
            readTime: "8 min read",
            views: 2547,
            category: "Technology",
            image: "🌱",
            featured: true
        },
        {
            id: 2,
            title: "Organic Farming: Building Sustainable Communities",
            excerpt: "Discover the benefits of organic farming practices and how they're transforming rural communities.",
            author: "Malini Perera",
            date: "2025-08-22",
            readTime: "6 min read",
            views: 1834,
            category: "Sustainability",
            image: "🌿"
        },
        {
            id: 3,
            title: "Weather Patterns and Crop Planning for 2025",
            excerpt: "Understanding monsoon patterns and climate data to optimize your planting schedule.",
            author: "Prof. Ravi Mendis",
            date: "2025-08-20",
            readTime: "12 min read",
            views: 3201,
            category: "Weather",
            image: "🌦️"
        }
    ];

    const farmingGuides = [
        {
            id: 1,
            title: "Complete Rice Cultivation Guide",
            description: "Step-by-step instructions for successful rice farming in Sri Lankan conditions",
            difficulty: "Intermediate",
            duration: "120 days",
            downloads: 5243,
            rating: 4.8,
            icon: "🌾"
        },
        {
            id: 2,
            title: "Vegetable Garden Setup",
            description: "How to start and maintain a productive vegetable garden",
            difficulty: "Beginner",
            duration: "30 days",
            downloads: 3874,
            rating: 4.9,
            icon: "🥬"
        },
        {
            id: 3,
            title: "Pest Control & Disease Management",
            description: "Natural and effective methods to protect your crops",
            difficulty: "Advanced",
            duration: "Ongoing",
            downloads: 2156,
            rating: 4.7,
            icon: "🐛"
        }
    ];

    const tutorials = [
        {
            id: 1,
            title: "Using ModGoviya Weather Analytics",
            type: "Video",
            duration: "15:32",
            views: 12543,
            difficulty: "Beginner",
            thumbnail: "📱"
        },
        {
            id: 2,
            title: "Setting Up Soil Monitoring Sensors",
            type: "Interactive",
            duration: "22:45",
            views: 8765,
            difficulty: "Intermediate",
            thumbnail: "📡"
        },
        {
            id: 3,
            title: "Marketplace Trading Strategies",
            type: "Article",
            duration: "10 min read",
            views: 6432,
            difficulty: "Advanced",
            thumbnail: "💰"
        }
    ];

    const faqs = [
        {
            category: "Getting Started",
            questions: [
                {
                    q: "How do I create an account on ModGoviya?",
                    a: "You can sign up by clicking the 'Register' button and providing your basic information. Verify your phone number to complete the process."
                },
                {
                    q: "Is ModGoviya free to use?",
                    a: "Yes, basic features are completely free. Premium features are available with our subscription plans."
                }
            ]
        },
        {
            category: "Weather & Analytics",
            questions: [
                {
                    q: "How accurate are the weather predictions?",
                    a: "Our weather data is sourced from multiple meteorological stations and has 85-90% accuracy for 7-day forecasts."
                },
                {
                    q: "Can I get weather alerts for my specific location?",
                    a: "Yes, you can set up customized alerts for your farm location through the Settings menu."
                }
            ]
        }
    ];

    const tabs = [
        { id: 'all', label: 'All Resources', icon: BookOpen },
        { id: 'blog', label: 'Blog', icon: BookOpen },
        { id: 'guides', label: 'Farming Guides', icon: Sprout },
        { id: 'tutorials', label: 'Tutorials', icon: PlayCircle },
        { id: 'faq', label: 'FAQ', icon: HelpCircle },
        { id: 'support', label: 'Help Center', icon: MessageSquare }
    ];

    const renderBlogSection = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Blog Posts</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Stay updated with the latest insights, tips, and innovations in modern agriculture
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <article key={post.id} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${post.featured ? 'ring-2 ring-green-500' : ''}`}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-4xl">{post.image}</span>
                                {post.featured && (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">Featured</span>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <User size={14} className="mr-1" />
                                        {post.author}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar size={14} className="mr-1" />
                                        {new Date(post.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Clock size={14} className="mr-1" />
                                        {post.readTime}
                                    </div>
                                    <div className="flex items-center">
                                        <Eye size={14} className="mr-1" />
                                        {post.views.toLocaleString()}
                                    </div>
                                </div>
                                <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                                    Read More
                                    <ArrowRight size={16} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );

    const renderGuidesSection = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Farming Guides</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Comprehensive guides to help you master modern farming techniques
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farmingGuides.map((guide) => (
                    <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{guide.icon}</span>
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{guide.rating}</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {guide.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {guide.description}
                        </p>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Difficulty:</span>
                                <span className={`font-medium ${
                                    guide.difficulty === 'Beginner' ? 'text-green-600' :
                                        guide.difficulty === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
                                }`}>{guide.difficulty}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Duration:</span>
                                <span className="text-gray-700 dark:text-gray-300">{guide.duration}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Downloads:</span>
                                <span className="text-gray-700 dark:text-gray-300">{guide.downloads.toLocaleString()}</span>
                            </div>
                        </div>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                            <Download size={18} className="mr-2" />
                            Download Guide
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTutorialsSection = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Video Tutorials</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Learn how to use ModGoviya features with step-by-step video tutorials
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                    <div key={tutorial.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-6xl">
                            {tutorial.thumbnail}
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    tutorial.type === 'Video' ? 'bg-red-100 text-red-800' :
                                        tutorial.type === 'Interactive' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                }`}>
                                    {tutorial.type}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                        tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                }`}>
                                    {tutorial.difficulty}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                {tutorial.title}
                            </h3>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center">
                                    <Clock size={14} className="mr-1" />
                                    {tutorial.duration}
                                </div>
                                <div className="flex items-center">
                                    <Eye size={14} className="mr-1" />
                                    {tutorial.views.toLocaleString()}
                                </div>
                            </div>
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                                <PlayCircle size={18} className="mr-2" />
                                Watch Tutorial
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFAQSection = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Find answers to common questions about ModGoviya
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {faqs.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                            <HelpCircle className="mr-2 text-green-600" size={20} />
                            {category.category}
                        </h3>
                        <div className="space-y-4">
                            {category.questions.map((item, qIndex) => (
                                <details key={qIndex} className="group">
                                    <summary className="flex items-center justify-between cursor-pointer list-none">
                                        <span className="font-medium text-gray-900 dark:text-white">{item.q}</span>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform duration-200" />
                                    </summary>
                                    <div className="mt-3 text-gray-600 dark:text-gray-300 pl-6">
                                        {item.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSupportSection = () => (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Help Center</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Get the support you need to make the most of ModGoviya
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Phone Support</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Speak directly with our agricultural experts
                    </p>
                    <div className="text-green-600 font-semibold text-lg mb-4">+94 11 234 5678</div>
                    <p className="text-sm text-gray-500">Mon-Fri: 8:00 AM - 6:00 PM</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Email Support</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Send us your questions via email
                    </p>
                    <div className="text-blue-600 font-semibold mb-4">support@modgoviya.lk</div>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Live Chat</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Get instant help from our support team
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Start Chat
                    </button>
                    <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Community Forum</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                        Connect with other farmers, share experiences, and learn from the community
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center mx-auto">
                        <Users className="mr-2" size={18} />
                        Join Community
                    </button>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'blog':
                return renderBlogSection();
            case 'guides':
                return renderGuidesSection();
            case 'tutorials':
                return renderTutorialsSection();
            case 'faq':
                return renderFAQSection();
            case 'support':
                return renderSupportSection();
            default:
                return (
                    <div className="space-y-16">
                        {renderBlogSection()}
                        {renderGuidesSection()}
                        {renderTutorialsSection()}
                        {renderFAQSection()}
                        {renderSupportSection()}
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zm10 10v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2zM14 6v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
                    backgroundSize: '60px 60px'
                }}></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                                <Leaf className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    ModGoviya Resources
                                </h1>
                                <p className="text-green-100 text-lg">
                                    Your Complete Agricultural Knowledge Hub
                                </p>
                            </div>
                        </div>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            Discover expert guides, tutorials, and resources to transform your farming journey with modern agricultural techniques
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Navigation */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            {/* Search Bar */}
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search resources..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Tab Navigation */}
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                                activeTab === tab.id
                                                    ? 'bg-green-600 text-white shadow-md'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <Icon size={16} className="mr-2" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {renderContent()}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Farming?
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                        Join thousands of Sri Lankan farmers who are already using ModGoviya to increase their productivity
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            Get Started Free
                        </button>
                        <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesHub;
