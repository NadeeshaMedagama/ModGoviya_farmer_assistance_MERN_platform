import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Package,
    Cloud,
    ShoppingCart,
    MessageCircle,
    Calendar,
    BookOpen,
    Check,
    Star,
    MapPin,
} from 'lucide-react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useTranslation } from 'react-i18next';

const ModGoviyaHomepage = () => {
    const { t, i18n } = useTranslation();
    const [isReady, setIsReady] = useState(false);

    // Wait for i18n to be ready
    React.useEffect(() => {
        if (i18n.isInitialized) {
            setIsReady(true);
        } else {
            const handleInitialized = () => setIsReady(true);
            i18n.on('initialized', handleInitialized);
            return () => i18n.off('initialized', handleInitialized);
        }
    }, [i18n]);

    const features = [
        {
            icon: Package,
            titleKey: t('home.features.cropManagement.title', { defaultValue: 'Crop Management' }),
            descriptionKey: t('home.features.cropManagement.description', { defaultValue: 'Monitor crop health, track growth stages, manage planting schedules, and log harvest data efficiently.' })
        },
        {
            icon: Cloud,
            titleKey: t('home.features.weather.title', { defaultValue: 'Weather Updates' }),
            descriptionKey: t('home.features.weather.description', { defaultValue: 'Receive accurate, hyper-local forecasts and severe weather alerts to protect your crops and plan your activities.' })
        },
        {
            icon: ShoppingCart,
            titleKey: t('home.features.marketplace.title', { defaultValue: 'Marketplace Updates' }),
            descriptionKey: t('home.features.marketplace.description', { defaultValue: 'Get real-time price alerts, connect directly with buyers, and stay informed on local market demands.' })
        },
        {
            icon: MessageCircle,
            titleKey: t('home.features.community.title', { defaultValue: 'Community Updates' }),
            descriptionKey: t('home.features.community.description', { defaultValue: 'Share knowledge, ask questions, and stay connected with a network of local farmers and experts.' })
        },
        {
            icon: Calendar,
            titleKey: t('home.features.scheduler.title', { defaultValue: 'Schedule Updates' }),
            descriptionKey: t('home.features.scheduler.description', { defaultValue: 'Plan irrigation, fertilization, and pest control with smart reminders tailored to your specific crops.' })
        },
        {
            icon: BookOpen,
            titleKey: t('features.resources.title', { defaultValue: 'Farming Resources' }),
            descriptionKey: t('features.resources.description', { defaultValue: 'Access comprehensive guides, modern farming techniques, organic methods, and latest agricultural research.' })
        }
    ];

    const benefits = [
        'home.benefits.interface',
        'home.benefits.language',
        'home.benefits.local',
        'home.benefits.device'
    ];

    const testimonials = [
        {
            nameKey: 'home.testimonials.ravi.name',
            locationKey: 'home.testimonials.ravi.location',
            textKey: 'home.testimonials.ravi.text',
            rating: 5
        },
        {
            nameKey: 'home.testimonials.kamala.name',
            locationKey: 'home.testimonials.kamala.location',
            textKey: 'home.testimonials.kamala.text',
            rating: 5
        },
        {
            nameKey: 'home.testimonials.sunil.name',
            locationKey: 'home.testimonials.sunil.location',
            textKey: 'home.testimonials.sunil.text',
            rating: 5
        }
    ];

    const steps = [
        {
            number: "01",
            titleKey: 'home.steps.register.title',
            descriptionKey: 'home.steps.register.description'
        },
        {
            number: "02",
            titleKey: 'home.steps.manage.title',
            descriptionKey: 'home.steps.manage.description'
        },
        {
            number: "03",
            titleKey: 'home.steps.connect.title',
            descriptionKey: 'home.steps.connect.description'
        },
        {
            number: "04",
            titleKey: 'home.steps.grow.title',
            descriptionKey: 'home.steps.grow.description'
        }
    ];

    if (!isReady) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-green-100 py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 ">
                        <span className="text-gray-900">Empowering Farmers with</span>
                        <br/>
                        <span className="text-green-600 mt-4 inline-block">Modern Technology</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Join thousands of farmers using ModGoviya to revolutionize their farming practices with smart tools, weather insights, and community support.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                        >
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            to="/features"
                            className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200"
                        >
                            Browse Features
                        </Link>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('home.featuresSection.title')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t('home.featuresSection.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index}
                                 className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                <div
                                    className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-6">
                                    <feature.icon className="text-green-600 dark:text-green-400" size={24}/>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t(feature.titleKey)}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{t(feature.descriptionKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('home.howItWorks.title')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('home.howItWorks.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div
                                    className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t(step.titleKey)}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{t(step.descriptionKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                {t('home.whyChoose.title')}
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                {t('home.whyChoose.description')}
                            </p>
                            <div className="space-y-4">
                                {benefits.map((benefitKey, index) => (
                                    <div key={index} className="flex items-center">
                                        <div
                                            className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                            <Check className="text-green-600" size={14}/>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{t(benefitKey)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
                                <div className="text-gray-600 dark:text-gray-300 mb-4">Active Farmers</div>
                                <div className="text-4xl font-bold text-green-600 mb-2">25%</div>
                                <div className="text-gray-600 dark:text-gray-300 mb-4">Average Yield Increase</div>
                                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                                <div className="text-gray-600 dark:text-gray-300">Villages Covered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('home.testimonialsSection.title')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('home.testimonialsSection.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="text-yellow-400 fill-current" size={20}/>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{t(testimonial.textKey)}"</p>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">{t(testimonial.nameKey)}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                        <MapPin size={14} className="mr-1"/>
                                        {t(testimonial.locationKey)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t('home.latestTips.title')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            {t('home.latestTips.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">June 15, 2025</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Best Practices for Monsoon Season Farming
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Learn how to protect your crops and maximize yield during the rainy season.
                                </p>
                                <a href="#" className="text-green-600 font-medium hover:text-green-700">
                                    Read More →
                                </a>
                            </div>
                        </article>

                        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="h-48 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">June 12, 2025</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Smart Irrigation Techniques for Water Conservation
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Discover modern irrigation methods that save water and increase efficiency.
                                </p>
                                <a href="#" className="text-green-600 font-medium hover:text-green-700">
                                    Read More →
                                </a>
                            </div>
                        </article>

                        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500"></div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">June 10, 2025</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    Organic Pest Control Methods
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Natural and effective ways to protect your crops from pests without chemicals.
                                </p>
                                <a href="#" className="text-green-600 font-medium hover:text-green-700">
                                    Read More →
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ModGoviyaHomepage;
