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
    const { t } = useTranslation();

    const features = [
        {
            icon: Package,
            title: t('home.features.cropManagement.title'),
            description: t('home.features.cropManagement.description')
        },
        {
            icon: Cloud,
            title: t('home.features.weather.title'),
            description: t('home.features.weather.description')
        },
        {
            icon: ShoppingCart,
            title: t('home.features.marketplace.title'),
            description: t('home.features.marketplace.description')
        },
        {
            icon: MessageCircle,
            title: t('home.features.community.title'),
            description: t('home.features.community.description')
        },
        {
            icon: Calendar,
            title: t('home.features.scheduler.title'),
            description: t('home.features.scheduler.description')
        },
        {
            icon: BookOpen,
            title: t('home.features.tips.title'),
            description: t('home.features.tips.description')
        }
    ];

    const benefits = [
        t('home.benefits.interface'),
        t('home.benefits.language'),
        t('home.benefits.local'),
        t('home.benefits.device')
    ];

    const testimonials = [
        {
            name: t('home.testimonials.ravi.name'),
            location: t('home.testimonials.ravi.location'),
            text: t('home.testimonials.ravi.text'),
            rating: 5
        },
        {
            name: t('home.testimonials.kamala.name'),
            location: t('home.testimonials.kamala.location'),
            text: t('home.testimonials.kamala.text'),
            rating: 5
        },
        {
            name: t('home.testimonials.sunil.name'),
            location: t('home.testimonials.sunil.location'),
            text: t('home.testimonials.sunil.text'),
            rating: 5
        }
    ];

    const steps = [
        {
            number: "01",
            title: t('home.steps.register.title'),
            description: t('home.steps.register.description')
        },
        {
            number: "02",
            title: t('home.steps.manage.title'),
            description: t('home.steps.manage.description')
        },
        {
            number: "03",
            title: t('home.steps.connect.title'),
            description: t('home.steps.connect.description')
        },
        {
            number: "04",
            title: t('home.steps.grow.title'),
            description: t('home.steps.grow.description')
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header />
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 dark:from-gray-600/20 dark:to-gray-800/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {t('home.hero.title')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                        {t('home.hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                        >
                            {t('home.hero.getStarted')}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link
                            to="/features"
                            className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 dark:text-green-400 font-semibold rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition-all duration-200"
                        >
                            {t('home.hero.learnMore')}
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
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
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
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
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
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center">
                                        <div
                                            className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                            <Check className="text-green-600" size={14}/>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
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
                                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                        <MapPin size={14} className="mr-1"/>
                                        {testimonial.location}
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
