import React from 'react';
import { Link } from 'react-router-dom';
import { Users,
    Target,
    Eye,
    Phone,
    Mail,
    MapPin,
    Leaf,
    TrendingUp,
    Shield,
    Award
} from 'lucide-react';

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../components/common/LanguageSwitcher";

const AboutUs = () => {
    const { t } = useTranslation();
    const teamMembers = [
        {
            name: "Dr. Rajesh Kumar",
            position: t('about.team.cto', { defaultValue: 'Founder & CEO' }),
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
            description: t('about.team.rajeshDesc', { defaultValue: 'Agricultural Engineer with 15+ years in sustainable farming' })
        },
        {
            name: "Priya Sharma",
            position: t('about.team.positionCTO', { defaultValue: 'CTO' }),
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
            description: t('about.team.priyaDesc', { defaultValue: 'Technology expert specializing in AgTech solutions' })
        },
        {
            name: "Amit Patel",
            position: t('about.team.headOps', { defaultValue: 'Head of Operations' }),
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            description: t('about.team.amitDesc', { defaultValue: 'Operations specialist with deep farming industry knowledge' })
        },
        {
            name: "Dr. Sunita Rao",
            position: t('about.team.agriAdvisor', { defaultValue: 'Agricultural Advisor' }),
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
            description: t('about.team.sunitaDesc', { defaultValue: 'Plant pathologist and sustainable agriculture researcher' })
        }
    ];

    const stats = [
        { icon: Users, value: "50,000+", label: t('about.stats.farmersConnected', { defaultValue: 'Farmers Connected' }) },
        { icon: TrendingUp, value: "40%", label: t('about.stats.avgYield', { defaultValue: 'Average Yield Increase' }) },
        { icon: Shield, value: "99.9%", label: t('about.stats.reliability', { defaultValue: 'Platform Reliability' }) },
        { icon: Award, value: "25+", label: t('about.stats.awards', { defaultValue: 'Industry Awards' }) }
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This enables smooth scrolling
        });
    };

    const features = [
        {
            icon: Leaf,
            title: t('about.values.sustainable.title', { defaultValue: 'Sustainable Practices' }),
            description: t('about.values.sustainable.desc', { defaultValue: 'Promoting eco-friendly farming methods for long-term sustainability' })
        },
        {
            icon: TrendingUp,
            title: t('about.values.market.title', { defaultValue: 'Market Intelligence' }),
            description: t('about.values.market.desc', { defaultValue: 'Real-time market data and price predictions for better decision making' })
        },
        {
            icon: Users,
            title: t('about.values.community.title', { defaultValue: 'Community Support' }),
            description: t('about.values.community.desc', { defaultValue: 'Connecting farmers with experts and peer-to-peer knowledge sharing' })
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
            {/* Hero Section */}
            <Header />

            <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white pt-10">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            {t('about.hero.title', { defaultValue: 'About' })} <span className="text-yellow-300">ModGoviya</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                            {t('about.hero.subtitle', { defaultValue: 'Empowering farmers with modern technology and sustainable practices for a prosperous future' })}
                        </p>
                        <div className="w-24 h-1 bg-yellow-300 mx-auto rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                            {t('about.intro.title', { defaultValue: 'Revolutionizing Agriculture Through Technology' })}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {t('about.intro.p1', { defaultValue: 'ModGoviya (Modern Farmer) is a comprehensive digital platform designed to transform traditional farming practices through cutting-edge technology and data-driven insights. We bridge the gap between traditional agricultural wisdom and modern technological solutions.' })}
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {t('about.intro.p2', { defaultValue: "Our platform provides farmers with access to real-time weather data, crop monitoring tools, market intelligence, and a vibrant community of agricultural experts and fellow farmers. We believe that technology should serve humanity, and our mission is to make farming more profitable, sustainable, and efficient." })}
                        </p>
                        <div className="grid grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="text-center">
                                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <feature.icon className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop"
                            alt={t('about.images.modernFarmingAlt', { defaultValue: 'Modern farming technology' })}
                            className="rounded-2xl shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-2xl"></div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('about.stats.title', { defaultValue: 'Our Impact in Numbers' })}</h2>
                        <p className="text-lg text-gray-600">{t('about.stats.subtitle', { defaultValue: 'Driving measurable change in the agricultural sector' })}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-gradient-to-br from-green-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-10 h-10 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{t('about.mission.title', { defaultValue: 'Our Mission' })}</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('about.mission.desc', { defaultValue: 'To empower farmers worldwide with innovative technology solutions that enhance productivity, promote sustainable practices, and improve livelihoods. We strive to make advanced agricultural tools accessible to every farmer, regardless of their scale of operation or geographical location.' })}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center mb-6">
                            <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                                <Eye className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{t('about.vision.title', { defaultValue: 'Our Vision' })}</h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {t('about.vision.desc', { defaultValue: 'To create a world where technology and traditional farming wisdom work together to ensure food security, environmental sustainability, and economic prosperity for farming communities. We envision a future where every farmer is equipped with the knowledge and tools needed to thrive.' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{t('about.team.title', { defaultValue: 'Meet Our Team' })}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t('about.team.subtitle', { defaultValue: 'Our diverse team of agricultural experts, technologists, and industry veterans is dedicated to revolutionizing farming practices' })}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="text-center">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-green-100 dark:border-green-900/20"
                                    />
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{member.name}</h3>
                                    <p className="text-green-600 dark:text-green-400 font-semibold mb-3">{member.position}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">{t('about.contact.title', { defaultValue: 'Get in Touch' })}</h2>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            {t('about.contact.subtitle', { defaultValue: "Ready to transform your farming experience? We're here to help you every step of the way" })}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('about.contact.phoneTitle', { defaultValue: 'Phone Support' })}</h3>
                            <p className="opacity-90 mb-2">{t('about.contact.phoneDesc', { defaultValue: '24/7 customer support' })}</p>
                            <p className="text-lg font-semibold">+91 98765 43210</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('about.contact.emailTitle', { defaultValue: 'Email Us' })}</h3>
                            <p className="opacity-90 mb-2">{t('about.contact.emailDesc', { defaultValue: 'Quick response guaranteed' })}</p>
                            <p className="text-lg font-semibold">support@modgoviya.com</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{t('about.contact.visitTitle', { defaultValue: 'Visit Us' })}</h3>
                            <p className="opacity-90 mb-2">{t('about.contact.visitDesc', { defaultValue: 'Main headquarters' })}</p>
                            <p className="text-lg font-semibold">Bangalore, Karnataka, India</p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/contact">
                            <button
                                onClick={scrollToTop}
                              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                            {t('about.contact.cta', { defaultValue: 'Contact Us Today' })}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutUs;
