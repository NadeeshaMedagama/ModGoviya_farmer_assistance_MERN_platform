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
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-40">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            {t('home.hero.title')}
                            <span className="text-green-600 block pt-2">{t('home.hero.subtitle')}</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            {t('home.hero.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/cropmanage"
                                  className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                                {t('home.hero.getStarted')}
                                <ArrowRight className="ml-2" size={20}/>
                            </Link>
                            <Link to="/browse"
                                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                                {t('home.hero.browseFeatures')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('home.featuresSection.title')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t('home.featuresSection.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index}
                                 className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div
                                    className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                    <feature.icon className="text-green-600" size={24}/>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('home.howItWorks.title')}
                        </h2>
                        <p className="text-xl text-gray-600">
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
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {t('home.whyChoose.title')}
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                {t('home.whyChoose.description')}
                            </p>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center">
                                        <div
                                            className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                            <Check className="text-green-600" size={14}/>
                                        </div>
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
                                <div className="text-gray-600 mb-4">Active Farmers</div>
                                <div className="text-4xl font-bold text-green-600 mb-2">25%</div>
                                <div className="text-gray-600 mb-4">Average Yield Increase</div>
                                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                                <div className="text-gray-600">Villages Covered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('home.testimonialsSection.title')}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {t('home.testimonialsSection.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="text-yellow-400 fill-current" size={20}/>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500 flex items-center">
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
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('home.latestTips.title')}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {t('home.latestTips.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-2">June 15, 2025</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Best Practices for Monsoon Season Farming
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Learn how to protect your crops and maximize yield during the rainy season.
                                </p>
                                <a href="#" className="text-green-600 font-medium hover:text-green-700">
                                    Read More →
                                </a>
                            </div>
                        </article>

                        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="h-48 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-2">June 12, 2025</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Smart Irrigation Techniques for Water Conservation
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Discover modern irrigation methods that save water and increase efficiency.
                                </p>
                                <a href="#" className="text-green-600 font-medium hover:text-green-700">
                                    Read More →
                                </a>
                            </div>
                        </article>

                        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500"></div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-2">June 10, 2025</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Organic Pest Control Methods
                                </h3>
                                <p className="text-gray-600 mb-4">
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
