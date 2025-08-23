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
import { useTranslation } from 'react-i18next';

const FeaturesPage = () => {
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const { t } = useTranslation();

    const features = [
        {
            id: 1,
            icon: Sprout,
            title: t('home.features.cropManagement.title'),
            description: t('home.features.cropManagement.description'),
            benefits: [t('features.benefits.trackMultiple', { defaultValue: 'Track multiple crops' }), t('features.benefits.healthMonitoring', { defaultValue: 'Health monitoring' }), t('features.benefits.yieldPrediction', { defaultValue: 'Yield prediction' })],
            color: "from-green-400 to-emerald-600"
        },
        {
            id: 2,
            icon: Cloud,
            title: t('home.features.weather.title'),
            description: t('home.features.weather.description'),
            benefits: [t('features.benefits.hourlyUpdates', { defaultValue: 'Hourly updates' }), t('features.benefits.stormAlerts', { defaultValue: 'Storm alerts' }), t('features.benefits.irrigationPlanning', { defaultValue: 'Irrigation planning' })],
            color: "from-blue-400 to-cyan-600"
        },
        {
            id: 3,
            icon: ShoppingCart,
            title: t('home.features.marketplace.title'),
            description: t('home.features.marketplace.description'),
            benefits: [t('features.benefits.localConnections', { defaultValue: 'Local connections' }), t('features.benefits.securePayments', { defaultValue: 'Secure payments' }), t('features.benefits.qualityAssurance', { defaultValue: 'Quality assurance' })],
            color: "from-purple-400 to-indigo-600"
        },
        {
            id: 4,
            icon: Calendar,
            title: t('home.features.scheduler.title'),
            description: t('home.features.scheduler.description'),
            benefits: [t('features.benefits.smartReminders', { defaultValue: 'Smart reminders' }), t('features.benefits.taskAutomation', { defaultValue: 'Task automation' }), t('features.benefits.calendarSync', { defaultValue: 'Calendar sync' })],
            color: "from-orange-400 to-red-600"
        },
        {
            id: 5,
            icon: Bug,
            title: t('features.pest.title', { defaultValue: 'Pest & Disease Control' }),
            description: t('features.pest.description', { defaultValue: 'AI-powered pest identification through image upload with treatment recommendations and prevention strategies.' }),
            benefits: [t('features.benefits.aiIdentification', { defaultValue: 'AI identification' }), t('features.benefits.treatmentPlans', { defaultValue: 'Treatment plans' }), t('features.benefits.preventionTips', { defaultValue: 'Prevention tips' })],
            color: "from-red-400 to-pink-600"
        },
        {
            id: 6,
            icon: Users,
            title: t('home.features.community.title'),
            description: t('home.features.community.description'),
            benefits: [t('features.benefits.expertAdvice', { defaultValue: 'Expert advice' }), t('features.benefits.peerSupport', { defaultValue: 'Peer support' }), t('features.benefits.knowledgeSharing', { defaultValue: 'Knowledge sharing' })],
            color: "from-teal-400 to-green-600"
        },
        {
            id: 7,
            icon: BookOpen,
            title: t('features.resources.title', { defaultValue: 'Farming Resources' }),
            description: t('features.resources.description', { defaultValue: 'Access comprehensive guides, modern farming techniques, organic methods, and latest agricultural research.' }),
            benefits: [t('features.benefits.expertArticles', { defaultValue: 'Expert articles' }), t('features.benefits.videoTutorials', { defaultValue: 'Video tutorials' }), t('features.benefits.researchUpdates', { defaultValue: 'Research updates' })],
            color: "from-amber-400 to-orange-600"
        },
        {
            id: 8,
            icon: Bell,
            title: t('features.notifications.title', { defaultValue: 'Smart Notifications' }),
            description: t('features.notifications.description', { defaultValue: 'Intelligent alert system for weather changes, task reminders, marketplace deals, and community updates.' }),
            benefits: [t('features.benefits.customAlerts', { defaultValue: 'Custom alerts' }), t('features.benefits.priorityFiltering', { defaultValue: 'Priority filtering' }), t('features.benefits.multiChannel', { defaultValue: 'Multi-channel delivery' })],
            color: "from-pink-400 to-rose-600"
        },
        {
            id: 9,
            icon: Globe,
            title: t('features.multilang.title', { defaultValue: 'Multi-language Support' }),
            description: t('features.multilang.description', { defaultValue: 'Full platform support in Sinhala, Tamil, and English to serve Sri Lankan farming communities effectively.' }),
            benefits: [t('features.benefits.threeLanguages', { defaultValue: '3 languages' }), t('features.benefits.culturalAdaptation', { defaultValue: 'Cultural adaptation' }), t('features.benefits.localContext', { defaultValue: 'Local context' })],
            color: "from-indigo-400 to-purple-600"
        },
        {
            id: 10,
            icon: BarChart3,
            title: t('features.analytics.title', { defaultValue: 'Analytics & Insights' }),
            description: t('features.analytics.description', { defaultValue: 'Detailed reports on crop performance, productivity trends, weather patterns, and financial analytics.' }),
            benefits: [t('features.benefits.performanceMetrics', { defaultValue: 'Performance metrics' }), t('features.benefits.trendAnalysis', { defaultValue: 'Trend analysis' }), t('features.benefits.roiTracking', { defaultValue: 'ROI tracking' })],
            color: "from-cyan-400 to-blue-600"
        }
    ];

    const stats = [
        { number: "50K+", label: t('features.stats.activeFarmers', { defaultValue: 'Active Farmers' }) },
        { number: "95%", label: t('features.stats.cropSuccess', { defaultValue: 'Crop Success Rate' }) },
        { number: "24/7", label: t('features.stats.support', { defaultValue: 'Support Available' }) },
        { number: "10+", label: t('features.stats.languages', { defaultValue: 'Languages Supported' }) }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 dark:from-gray-600/20 dark:to-gray-800/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {t('features.hero.title', { defaultValue: 'Powerful Features for Modern Farmers' })}
                        </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                        {t('features.hero.subtitle', { defaultValue: 'Discover the comprehensive suite of tools designed to revolutionize your farming practices and boost productivity.' })}
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-xl border border-green-100 dark:border-gray-700">
                            <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {t('features.grid.title1', { defaultValue: 'Everything You Need to' })}
                        <span className="block text-green-600 dark:text-green-400">{t('features.grid.title2', { defaultValue: 'Grow Successfully' })}</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        {t('features.grid.subtitle', { defaultValue: 'Our comprehensive platform provides all the tools, insights, and community support you need to transform your farming operations.' })}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                                onMouseEnter={() => setHoveredFeature(feature.id)}
                                onMouseLeave={() => setHoveredFeature(null)}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg`}>
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{feature.description}</p>

                                <div className="space-y-2 mb-6">
                                    {feature.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            {benefit}
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-3 px-4 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                                    {t('features.learnMore', { defaultValue: 'Learn More' })}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Integration Section */}
            <div className="bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                {t('features.integration.title', { defaultValue: 'Seamless Integration with Your Workflow' })}
                            </h2>
                            <p className="text-gray-300 text-lg mb-8">
                                {t('features.integration.subtitle', { defaultValue: 'ModGoviya integrates perfectly with your existing farming practices, enhancing productivity without disrupting established routines.' })}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-300">
                                    <Check className="w-6 h-6 text-green-400 mr-3" />
                                    {t('features.integration.mobileFirst', { defaultValue: 'Mobile-first design for field use' })}
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Check className="w-6 h-6 text-green-400 mr-3" />
                                    {t('features.integration.offline', { defaultValue: 'Offline functionality for remote areas' })}
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Check className="w-6 h-6 text-green-400 mr-3" />
                                    {t('features.integration.realtime', { defaultValue: 'Real-time data synchronization' })}
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <Check className="w-6 h-6 text-green-400 mr-3" />
                                    {t('features.integration.multidevice', { defaultValue: 'Multi-device accessibility' })}
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
                        {t('features.cta.title', { defaultValue: 'Ready to Transform Your Farming Journey?' })}
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                        {t('features.cta.subtitle', { defaultValue: 'Join thousands of successful farmers who trust ModGoviya to enhance their productivity and profitability.' })}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                            {t('features.cta.startTrial', { defaultValue: 'Start Free Trial' })}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <Link
                            to="/schedule"
                              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300">
                            {t('features.cta.scheduleDemo', { defaultValue: 'Schedule Demo' })}
                        </Link>
                    </div>
                    <div className="mt-8 text-green-100">
                        <p>✓ {t('features.cta.noCard', { defaultValue: 'No credit card required' })}  ✓ {t('features.cta.trial', { defaultValue: '30-day free trial' })}  ✓ {t('features.cta.cancel', { defaultValue: 'Cancel anytime' })}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FeaturesPage;
