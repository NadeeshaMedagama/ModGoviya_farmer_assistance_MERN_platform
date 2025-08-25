import React, { useState } from 'react';
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
    Star,
    Smartphone,
    Wifi,
    Shield,
    Clock,
    TrendingUp,
    Award,
    Camera,
    MessageCircle,
    PlayCircle,
    FileText,
    AlertTriangle,
    Languages,
    PieChart,
    Zap,
    Target,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const FeatureDetailsPage = () => {
    const [activeFeature, setActiveFeature] = useState('crop-management');
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const features = {
        'crop-management': {
            id: 'crop-management',
            icon: Sprout,
            title: 'Crop Management',
            subtitle: 'Complete crop lifecycle management system',
            description: 'Advanced digital platform for comprehensive crop monitoring, health assessment, and yield optimization using cutting-edge agricultural technology.',
            color: 'from-green-400 to-emerald-600',
            benefits: ['Track multiple crops', 'Health monitoring', 'Yield prediction'],
            details: {
                overview: 'Our Crop Management system revolutionizes how farmers monitor and manage their crops throughout the growing season. Using IoT sensors, satellite imagery, and AI-powered analytics, you get real-time insights into crop health, growth patterns, and potential issues before they become problems.',
                keyFeatures: [
                    {
                        title: 'Multi-Crop Dashboard',
                        description: 'Monitor different crop types simultaneously with customized dashboards for each variety.',
                        icon: Target
                    },
                    {
                        title: 'Health Monitoring',
                        description: 'AI-powered health assessment using drone imagery and sensor data to detect diseases early.',
                        icon: Shield
                    },
                    {
                        title: 'Yield Prediction',
                        description: 'Advanced algorithms predict harvest yields with 90%+ accuracy using historical and real-time data.',
                        icon: TrendingUp
                    },
                    {
                        title: 'Growth Tracking',
                        description: 'Track crop development stages and receive notifications for optimal care timing.',
                        icon: Clock
                    }
                ],
                howItWorks: [
                    'Connect IoT sensors to your fields for continuous monitoring',
                    'Upload field photos for AI-powered health analysis',
                    'Receive automated alerts for irrigation, fertilization, and pest control',
                    'Access predictive analytics for harvest planning and market timing'
                ],
                benefits: [
                    'Increase crop yields by up to 30%',
                    'Reduce crop losses from diseases and pests',
                    'Optimize resource usage and reduce costs',
                    'Make data-driven farming decisions'
                ]
            }
        },
        'weather-updates': {
            id: 'weather-updates',
            icon: Cloud,
            title: 'Weather Updates',
            subtitle: 'Hyperlocal weather intelligence for farming',
            description: 'Get precise, location-specific weather data with forecasts tailored for agricultural decision-making and crop protection.',
            color: 'from-blue-400 to-cyan-600',
            benefits: ['Hourly updates', 'Storm alerts', 'Irrigation planning'],
            details: {
                overview: 'Weather is the most critical factor affecting crop success. Our advanced weather system provides hyperlocal forecasts, severe weather alerts, and agricultural-specific insights to help you make informed decisions about planting, irrigation, harvesting, and crop protection.',
                keyFeatures: [
                    {
                        title: 'Hyperlocal Forecasts',
                        description: '15-day detailed weather forecasts with hourly precision for your specific farm location.',
                        icon: Target
                    },
                    {
                        title: 'Storm Alert System',
                        description: 'Real-time severe weather warnings with recommended protective actions for crops.',
                        icon: AlertTriangle
                    },
                    {
                        title: 'Irrigation Planner',
                        description: 'Smart irrigation recommendations based on soil moisture, weather patterns, and crop needs.',
                        icon: Sprout
                    },
                    {
                        title: 'Growing Degree Days',
                        description: 'Track accumulated heat units for precise crop development timing and harvest planning.',
                        icon: TrendingUp
                    }
                ],
                howItWorks: [
                    'Set your farm location for hyperlocal weather data',
                    'Configure alert preferences for different weather conditions',
                    'Receive automated irrigation and protection recommendations',
                    'Access historical weather data for long-term planning'
                ],
                benefits: [
                    'Reduce irrigation costs by 25-40%',
                    'Prevent weather-related crop losses',
                    'Optimize planting and harvesting timing',
                    'Improve water conservation practices'
                ]
            }
        },
        'marketplace': {
            id: 'marketplace',
            icon: ShoppingCart,
            title: 'Marketplace Updates',
            subtitle: 'Direct farm-to-market digital platform',
            description: 'Connect directly with buyers, access real-time market prices, and secure the best deals for your agricultural products.',
            color: 'from-purple-400 to-indigo-600',
            benefits: ['Local connections', 'Secure payments', 'Quality assurance'],
            details: {
                overview: 'Our integrated marketplace eliminates middlemen, connecting farmers directly with buyers, retailers, and consumers. Get fair prices, secure payments, and build lasting business relationships while maintaining quality standards throughout the supply chain.',
                keyFeatures: [
                    {
                        title: 'Direct Buyer Connections',
                        description: 'Connect with verified buyers, restaurants, retailers, and consumers in your area.',
                        icon: Users
                    },
                    {
                        title: 'Price Analytics',
                        description: 'Real-time market prices and historical trends to help you time your sales optimally.',
                        icon: BarChart3
                    },
                    {
                        title: 'Secure Payments',
                        description: 'Guaranteed payment processing with escrow protection for high-value transactions.',
                        icon: Shield
                    },
                    {
                        title: 'Quality Certification',
                        description: 'Digital quality certificates and buyer rating systems to build trust and premium pricing.',
                        icon: Award
                    }
                ],
                howItWorks: [
                    'List your products with photos and quality specifications',
                    'Receive purchase inquiries from verified buyers',
                    'Negotiate prices and delivery terms through the platform',
                    'Complete transactions with secure payment processing'
                ],
                benefits: [
                    'Increase profits by 20-35% through direct sales',
                    'Build long-term buyer relationships',
                    'Access premium markets for organic/specialty crops',
                    'Reduce marketing and distribution costs'
                ]
            }
        },
        'scheduler': {
            id: 'scheduler',
            icon: Calendar,
            title: 'Schedule Updates',
            subtitle: 'Intelligent farm task automation',
            description: 'Smart scheduling system that automates farm task reminders and optimizes your daily farming operations.',
            color: 'from-orange-400 to-red-600',
            benefits: ['Smart reminders', 'Task automation', 'Calendar sync'],
            details: {
                overview: 'Farming requires precise timing for maximum productivity. Our intelligent scheduler learns your farming patterns, considers weather conditions, crop stages, and market conditions to optimize your daily, weekly, and seasonal farming activities.',
                keyFeatures: [
                    {
                        title: 'AI-Powered Scheduling',
                        description: 'Intelligent task scheduling based on weather, crop stages, and optimal timing.',
                        icon: Zap
                    },
                    {
                        title: 'Multi-Device Sync',
                        description: 'Sync schedules across all devices and share with farm workers and family.',
                        icon: Smartphone
                    },
                    {
                        title: 'Task Templates',
                        description: 'Pre-built task templates for different crops and seasonal activities.',
                        icon: FileText
                    },
                    {
                        title: 'Progress Tracking',
                        description: 'Monitor task completion and analyze productivity patterns over time.',
                        icon: TrendingUp
                    }
                ],
                howItWorks: [
                    'Set up your crop calendar and farming operations',
                    'Configure automated reminders for critical tasks',
                    'Receive weather-adjusted scheduling recommendations',
                    'Track completion and analyze productivity metrics'
                ],
                benefits: [
                    'Never miss critical farming deadlines',
                    'Optimize labor and resource allocation',
                    'Improve overall farm productivity by 15-25%',
                    'Better work-life balance with automated planning'
                ]
            }
        },
        'pest-disease': {
            id: 'pest-disease',
            icon: Bug,
            title: 'Pest & Disease Control',
            subtitle: 'AI-powered crop protection system',
            description: 'Advanced pest and disease identification using computer vision with personalized treatment recommendations.',
            color: 'from-red-400 to-pink-600',
            benefits: ['AI identification', 'Treatment plans', 'Prevention tips'],
            details: {
                overview: 'Crop diseases and pests cause billions in losses annually. Our AI-powered system identifies threats within seconds using just a smartphone photo, providing immediate treatment recommendations and prevention strategies tailored to your specific crops and location.',
                keyFeatures: [
                    {
                        title: 'Instant AI Diagnosis',
                        description: 'Identify pests and diseases instantly by uploading photos with 95%+ accuracy.',
                        icon: Camera
                    },
                    {
                        title: 'Treatment Database',
                        description: 'Comprehensive treatment protocols for organic, IPM, and conventional farming methods.',
                        icon: FileText
                    },
                    {
                        title: 'Prevention Calendar',
                        description: 'Proactive prevention schedules based on local pest cycles and weather patterns.',
                        icon: Calendar
                    },
                    {
                        title: 'Expert Consultation',
                        description: 'Connect with agricultural experts for complex cases and second opinions.',
                        icon: Users
                    }
                ],
                howItWorks: [
                    'Take photos of affected plants or suspected pest activity',
                    'AI analyzes images and provides instant identification',
                    'Receive customized treatment recommendations and prevention tips',
                    'Track treatment progress and effectiveness over time'
                ],
                benefits: [
                    'Reduce crop losses by up to 50%',
                    'Minimize pesticide use with targeted treatments',
                    'Early detection prevents major outbreaks',
                    'Lower treatment costs with precise recommendations'
                ]
            }
        },
        'community': {
            id: 'community',
            icon: Users,
            title: 'Community Updates',
            subtitle: 'Connected farming community platform',
            description: 'Join a thriving community of farmers sharing knowledge, experiences, and support for collective success.',
            color: 'from-teal-400 to-green-600',
            benefits: ['Expert advice', 'Peer support', 'Knowledge sharing'],
            details: {
                overview: 'Farming is both an art and science that benefits from shared knowledge. Our community platform connects you with thousands of farmers, agricultural experts, and researchers to share experiences, solve problems, and discover new opportunities together.',
                keyFeatures: [
                    {
                        title: 'Expert Network',
                        description: 'Access certified agricultural experts, researchers, and successful farmers.',
                        icon: Award
                    },
                    {
                        title: 'Discussion Forums',
                        description: 'Crop-specific forums for sharing experiences and getting advice on challenges.',
                        icon: MessageCircle
                    },
                    {
                        title: 'Success Stories',
                        description: 'Learn from other farmers\' success stories and proven techniques.',
                        icon: Star
                    },
                    {
                        title: 'Local Groups',
                        description: 'Connect with farmers in your region for local insights and collaboration.',
                        icon: Globe
                    }
                ],
                howItWorks: [
                    'Join crop-specific and regional farming communities',
                    'Ask questions and share your farming experiences',
                    'Participate in expert-led discussions and webinars',
                    'Collaborate on group purchases and knowledge sharing'
                ],
                benefits: [
                    'Learn from experienced farmers worldwide',
                    'Get solutions to farming challenges quickly',
                    'Build professional farming networks',
                    'Access group buying opportunities'
                ]
            }
        },
        'resources': {
            id: 'resources',
            icon: BookOpen,
            title: 'Farming Resources',
            subtitle: 'Comprehensive agricultural knowledge base',
            description: 'Access the world\'s largest collection of farming guides, research papers, and educational content.',
            color: 'from-amber-400 to-orange-600',
            benefits: ['Expert articles', 'Video tutorials', 'Research updates'],
            details: {
                overview: 'Continuous learning is key to farming success. Our comprehensive resource library provides access to the latest agricultural research, proven techniques, step-by-step guides, and video tutorials from leading agricultural institutions and successful farmers worldwide.',
                keyFeatures: [
                    {
                        title: 'Video Learning',
                        description: 'HD video tutorials covering all aspects of modern farming techniques.',
                        icon: PlayCircle
                    },
                    {
                        title: 'Research Library',
                        description: 'Latest agricultural research papers and findings from global institutions.',
                        icon: FileText
                    },
                    {
                        title: 'Step-by-Step Guides',
                        description: 'Detailed guides for crop cultivation, pest management, and farm operations.',
                        icon: BookOpen
                    },
                    {
                        title: 'Certification Courses',
                        description: 'Professional development courses with certificates for sustainable farming practices.',
                        icon: Award
                    }
                ],
                howItWorks: [
                    'Browse resources by crop type, farming method, or topic',
                    'Follow structured learning paths for skill development',
                    'Download guides and videos for offline access',
                    'Earn certificates by completing educational modules'
                ],
                benefits: [
                    'Stay updated with latest farming innovations',
                    'Improve farming techniques and productivity',
                    'Reduce learning curve for new crops/methods',
                    'Build professional credentials in agriculture'
                ]
            }
        },
        'notifications': {
            id: 'notifications',
            icon: Bell,
            title: 'Smart Notifications',
            subtitle: 'Intelligent agricultural alert system',
            description: 'Receive precisely timed alerts for weather, tasks, market opportunities, and community updates.',
            color: 'from-pink-400 to-rose-600',
            benefits: ['Custom alerts', 'Priority filtering', 'Multi-channel delivery'],
            details: {
                overview: 'Timing is everything in agriculture. Our smart notification system learns your preferences and farming patterns to deliver the right information at the right time through your preferred channels, helping you never miss critical opportunities or deadlines.',
                keyFeatures: [
                    {
                        title: 'Smart Filtering',
                        description: 'AI learns your priorities and filters notifications to show only what matters most.',
                        icon: Zap
                    },
                    {
                        title: 'Multi-Channel Alerts',
                        description: 'Receive notifications via SMS, email, push notifications, or WhatsApp.',
                        icon: Smartphone
                    },
                    {
                        title: 'Custom Categories',
                        description: 'Set different notification preferences for weather, tasks, market, and community updates.',
                        icon: Target
                    },
                    {
                        title: 'Snooze & Scheduling',
                        description: 'Intelligent snooze options and custom scheduling for non-urgent notifications.',
                        icon: Clock
                    }
                ],
                howItWorks: [
                    'Configure notification preferences for different categories',
                    'Set priority levels and delivery methods for each type',
                    'AI learns from your responses to optimize future notifications',
                    'Manage all notifications from a unified dashboard'
                ],
                benefits: [
                    'Never miss critical farming deadlines',
                    'Reduce information overload with smart filtering',
                    'Respond quickly to time-sensitive opportunities',
                    'Stay informed without being overwhelmed'
                ]
            }
        },
        'multilanguage': {
            id: 'multilanguage',
            icon: Globe,
            title: 'Multi-language Support',
            subtitle: 'Agriculture in your native language',
            description: 'Complete platform support in Sinhala, Tamil, and English for Sri Lankan farming communities.',
            color: 'from-indigo-400 to-purple-600',
            benefits: ['3 languages', 'Cultural adaptation', 'Local context'],
            details: {
                overview: 'Language should never be a barrier to accessing modern farming technology. Our platform provides complete functionality in Sinhala, Tamil, and English, with culturally adapted content that respects local farming traditions while introducing modern techniques.',
                keyFeatures: [
                    {
                        title: 'Native Language Interface',
                        description: 'Complete UI/UX in Sinhala, Tamil, and English with seamless language switching.',
                        icon: Languages
                    },
                    {
                        title: 'Cultural Adaptation',
                        description: 'Content adapted to local farming practices, crops, and cultural contexts.',
                        icon: Globe
                    },
                    {
                        title: 'Local Crop Database',
                        description: 'Comprehensive information about local Sri Lankan crops in native languages.',
                        icon: Sprout
                    },
                    {
                        title: 'Regional Content',
                        description: 'Location-specific farming advice for different climatic zones of Sri Lanka.',
                        icon: Target
                    }
                ],
                howItWorks: [
                    'Select your preferred language during account setup',
                    'Switch languages anytime from the settings menu',
                    'Access region-specific content for your farming zone',
                    'Communicate with experts in your preferred language'
                ],
                benefits: [
                    'Comfortable learning in your native language',
                    'Better understanding of complex agricultural concepts',
                    'Preserve local farming knowledge while modernizing',
                    'Inclusive access for all Sri Lankan farmers'
                ]
            }
        },
        'analytics': {
            id: 'analytics',
            icon: BarChart3,
            title: 'Analytics & Insights',
            subtitle: 'Data-driven farming intelligence',
            description: 'Comprehensive analytics on crop performance, financial trends, and productivity optimization insights.',
            color: 'from-cyan-400 to-blue-600',
            benefits: ['Performance metrics', 'Trend analysis', 'ROI tracking'],
            details: {
                overview: 'Transform raw farming data into actionable insights. Our advanced analytics platform tracks every aspect of your farming operation, providing detailed reports, trend analysis, and recommendations to continuously improve your productivity and profitability.',
                keyFeatures: [
                    {
                        title: 'Performance Dashboard',
                        description: 'Real-time dashboards showing key metrics for crops, finances, and operations.',
                        icon: BarChart3
                    },
                    {
                        title: 'Predictive Analytics',
                        description: 'AI-powered predictions for yields, market prices, and optimal farming decisions.',
                        icon: TrendingUp
                    },
                    {
                        title: 'Financial Tracking',
                        description: 'Detailed profit/loss analysis, ROI calculations, and cost optimization insights.',
                        icon: PieChart
                    },
                    {
                        title: 'Benchmarking',
                        description: 'Compare your performance with similar farms and industry standards.',
                        icon: Target
                    }
                ],
                howItWorks: [
                    'System automatically collects data from all farming activities',
                    'AI analyzes patterns and identifies optimization opportunities',
                    'Receive detailed reports and actionable recommendations',
                    'Track progress over time and compare with benchmarks'
                ],
                benefits: [
                    'Increase profitability through data-driven decisions',
                    'Identify and eliminate inefficiencies quickly',
                    'Track ROI for different farming investments',
                    'Plan future seasons based on historical performance'
                ]
            }
        }
    };

    const FeatureNavigation = () => (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex overflow-x-auto py-4 space-x-4">
                    {Object.values(features).map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <button
                                key={feature.id}
                                onClick={() => setActiveFeature(feature.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                                    activeFeature === feature.id
                                        ? 'bg-green-600 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                <IconComponent className="w-4 h-4" />
                                <span className="font-medium">{feature.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const currentFeature = features[activeFeature];
    const IconComponent = currentFeature.icon;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <Header />
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            ModGoviya Feature Guide
                        </h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            Explore our comprehensive suite of agricultural technology tools designed to transform your farming experience
                        </p>
                    </div>
                </div>
            </div>

            <FeatureNavigation />

            {/* Feature Detail Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Feature Hero */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${currentFeature.color} rounded-3xl mb-6 shadow-lg`}>
                                <IconComponent className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {currentFeature.title}
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                                {currentFeature.subtitle}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                {currentFeature.description}
                            </p>
                        </div>
                        <div className="relative">
                            <div className={`bg-gradient-to-br ${currentFeature.color} rounded-3xl p-1`}>
                                <div className="bg-gray-900 rounded-3xl p-8">
                                    <div className="grid grid-cols-1 gap-4">
                                        {currentFeature.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center text-white">
                                                <Check className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                                                <span className="text-lg font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overview Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {currentFeature.details.overview}
                    </p>
                </div>

                {/* Key Features Grid */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentFeature.details.keyFeatures.map((feature, index) => {
                            const FeatureIcon = feature.icon;
                            return (
                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${currentFeature.color} rounded-xl mb-4`}>
                                        <FeatureIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mb-8">
                    <button
                        onClick={() => toggleSection('howItWorks')}
                        className="flex items-center justify-between w-full text-left mb-6"
                    >
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h3>
                        {expandedSections.howItWorks ? (
                            <ChevronUp className="w-8 h-8 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-8 h-8 text-gray-500" />
                        )}
                    </button>
                    {(expandedSections.howItWorks !== false) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {currentFeature.details.howItWorks.map((step, index) => (
                                <div key={index} className="relative">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${currentFeature.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4`}>
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {step}
                                    </p>
                                    {index < currentFeature.details.howItWorks.length - 1 && (
                                        <ArrowRight className="hidden lg:block absolute top-6 -right-3 w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Benefits Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-lg p-8 mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Expected Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentFeature.details.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                                <div className={`w-12 h-12 bg-gradient-to-br ${currentFeature.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                                    {benefit}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className={`bg-gradient-to-br ${currentFeature.color} rounded-3xl shadow-xl p-8 text-white text-center`}>
                    <h3 className="text-3xl font-bold mb-4">
                        Ready to Experience {currentFeature.title}?
                    </h3>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Join thousands of successful farmers who are already using ModGoviya to transform their agricultural operations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Start Free Trial
                        </button>
                        <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300">
                            Schedule Demo
                        </button>
                    </div>
                    <div className="mt-6 text-sm opacity-80">
                        ✓ No credit card required  ✓ 30-day free trial  ✓ Cancel anytime
                    </div>
                </div>

                {/* Related Features */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mt-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Explore Other Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.values(features)
                            .filter(feature => feature.id !== activeFeature)
                            .slice(0, 3)
                            .map((feature) => {
                                const RelatedIcon = feature.icon;
                                return (
                                    <button
                                        key={feature.id}
                                        onClick={() => setActiveFeature(feature.id)}
                                        className="group bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-left"
                                    >
                                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <RelatedIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                            {feature.subtitle}
                                        </p>
                                        <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                                            Learn More
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </button>
                                );
                            })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default FeatureDetailsPage;
