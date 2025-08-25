import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Shield,
    Users,
    TrendingUp,
    Globe,
    Sprout,
    Star,
    CheckCircle,
    Play,
    ChevronRight,
    Award,
    Zap,
    Target,
    MessageCircle,
    Truck,
    CreditCard,
    Phone,
    Mail,
    ArrowLeft,
    Quote
} from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const LearnMore = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[id^="section-"]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: Shield,
            title: "Secure Trading",
            description: "End-to-end encryption and verified seller profiles ensure safe transactions for all users.",
            details: ["Identity verification", "Secure payment gateway", "Fraud protection", "Dispute resolution"]
        },
        {
            icon: TrendingUp,
            title: "Market Insights",
            description: "Real-time price tracking and market analytics help you make informed buying and selling decisions.",
            details: ["Price trend analysis", "Demand forecasting", "Market reports", "Seasonal insights"]
        },
        {
            icon: Users,
            title: "Community Network",
            description: "Connect with thousands of farmers, suppliers, and agricultural experts in your region.",
            details: ["Local farmer groups", "Expert consultations", "Knowledge sharing", "Peer support"]
        },
        {
            icon: Globe,
            title: "Wide Reach",
            description: "Access buyers and sellers across the entire country with our comprehensive platform.",
            details: ["National marketplace", "Regional hubs", "Multi-language support", "Mobile accessibility"]
        },
        {
            icon: Zap,
            title: "Quick Transactions",
            description: "Streamlined processes ensure fast listing, buying, and selling of agricultural products.",
            details: ["Instant messaging", "Quick payment", "Fast delivery", "Real-time updates"]
        },
        {
            icon: Award,
            title: "Quality Assurance",
            description: "Rigorous quality checks and rating systems maintain high standards across all listings.",
            details: ["Product verification", "Seller ratings", "Quality guarantees", "Return policies"]
        }
    ];

    const stats = [
        { number: "50,000+", label: "Active Users", icon: Users },
        { number: "₹500M+", label: "Trade Volume", icon: TrendingUp },
        { number: "1,000+", label: "Daily Listings", icon: Sprout },
        { number: "98%", label: "Satisfaction Rate", icon: Star }
    ];

    const testimonials = [
        {
            name: "Raj Patel",
            role: "Rice Farmer, Gujarat",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
            content: "This platform revolutionized how I sell my crops. I can now reach buyers directly and get better prices for my produce.",
            rating: 5
        },
        {
            name: "Priya Sharma",
            role: "Agricultural Supplier, Punjab",
            image: "https://images.unsplash.com/photo-1494790108755-2616b332c5d6?w=100",
            content: "The quality of buyers and the ease of transactions on this platform is exceptional. My business has grown 300% since joining.",
            rating: 5
        },
        {
            name: "Kumar Reddy",
            role: "Organic Farmer, Karnataka",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
            content: "Finally, a platform that understands farmers' needs. The community support and market insights are invaluable.",
            rating: 5
        }
    ];

    const howItWorks = [
        {
            step: "01",
            title: "Create Your Profile",
            description: "Sign up and create a detailed profile with verification documents",
            icon: Users
        },
        {
            step: "02",
            title: "List Your Products",
            description: "Add your agricultural products with photos and detailed descriptions",
            icon: Sprout
        },
        {
            step: "03",
            title: "Connect with Buyers",
            description: "Receive inquiries and negotiate directly with interested buyers",
            icon: MessageCircle
        },
        {
            step: "04",
            title: "Complete Transaction",
            description: "Finalize the deal with secure payment and arrange delivery",
            icon: CreditCard
        }
    ];

    const AnimatedCounter = ({ end, suffix = "" }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const timer = setInterval(() => {
                setCount(prev => {
                    const increment = Math.ceil(end / 100);
                    if (prev + increment >= end) {
                        clearInterval(timer);
                        return end;
                    }
                    return prev + increment;
                });
            }, 30);

            return () => clearInterval(timer);
        }, [end]);

        return <span>{count}{suffix}</span>;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Header />

            {/* Hero Section */}
            <section id="section-hero" className={`py-12 relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 transition-all duration-1000 ${isVisible['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Transforming
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent pb-3">
                Agricultural Trade
              </span>
                        </h1>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Discover how our platform is revolutionizing the way farmers, suppliers, and buyers connect,
                            creating a more efficient and profitable agricultural ecosystem for everyone.
                        </p>
                        <div className="flex justify-center">
                            <Link
                                to="/watchdemo"
                                  className="group bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center">
                                <Play className="w-5 h-5 mr-3" />
                                Watch Demo Video
                                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="section-stats" className={`py-16 bg-white transition-all duration-1000 delay-200 ${isVisible['section-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-green-100 rounded-full p-4">
                                        <stat.icon className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {stat.number.includes('+') ? (
                                        <>
                                            <AnimatedCounter end={parseInt(stat.number.replace(/[^0-9]/g, ''))} />
                                            {stat.number.includes('M') ? 'M+' : stat.number.includes('%') ? '%' : '+'}
                                        </>
                                    ) : (
                                        stat.number
                                    )}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="section-features" className={`py-20 bg-gray-50 transition-all duration-1000 delay-300 ${isVisible['section-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the future of agricultural trading with our comprehensive suite of features designed
                            to empower farmers and streamline the entire supply chain.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mb-6 group-hover:bg-green-200 transition-colors">
                                    <feature.icon className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 mb-6">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-500">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="section-how-it-works" className={`py-20 bg-white transition-all duration-1000 delay-400 ${isVisible['section-how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get started in just four simple steps and join thousands of successful traders on our platform.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connection Lines */}
                        <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-200"></div>

                        <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
                            {howItWorks.map((step, index) => (
                                <div key={index} className="relative text-center">
                                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <div className="relative mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg">
                                            {step.step}
                                            {index < howItWorks.length - 1 && (
                                                <ChevronRight className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-green-400 w-6 h-6" />
                                            )}
                                        </div>
                                        <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                                            <step.icon className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="section-testimonials" className={`py-20 bg-gray-50 transition-all duration-1000 delay-500 ${isVisible['section-testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            What Our Users Say
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Hear from farmers and traders who have transformed their businesses using our platform.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            <div className="flex items-center justify-center mb-8">
                                <Quote className="w-12 h-12 text-green-200" />
                            </div>

                            <div className="text-center">
                                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                                    "{testimonials[activeTestimonial].content}"
                                </p>

                                <div className="flex items-center justify-center mb-6">
                                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                <div className="flex items-center justify-center">
                                    <img
                                        src={testimonials[activeTestimonial].image}
                                        alt={testimonials[activeTestimonial].name}
                                        className="w-16 h-16 rounded-full mr-4 object-cover"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</h4>
                                        <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        index === activeTestimonial ? 'bg-green-600' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="section-benefits" className={`py-20 bg-gradient-to-br from-green-600 to-emerald-700 transition-all duration-1000 delay-600 ${isVisible['section-benefits'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Benefits for Every User
                        </h2>
                        <p className="text-xl text-green-100 max-w-2xl mx-auto">
                            Whether you're a farmer, supplier, or buyer, our platform provides unique advantages tailored to your needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                                <Sprout className="w-8 h-8 text-green-200" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">For Farmers</h3>
                            <ul className="text-green-100 space-y-2 text-left">
                                <li>• Direct access to buyers</li>
                                <li>• Better profit margins</li>
                                <li>• Market price insights</li>
                                <li>• Reduced middleman costs</li>
                                <li>• Flexible payment options</li>
                            </ul>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                                <Truck className="w-8 h-8 text-green-200" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">For Suppliers</h3>
                            <ul className="text-green-100 space-y-2 text-left">
                                <li>• Wider customer reach</li>
                                <li>• Inventory management</li>
                                <li>• Order tracking</li>
                                <li>• Bulk order capabilities</li>
                                <li>• Analytics dashboard</li>
                            </ul>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                                <Target className="w-8 h-8 text-green-200" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">For Buyers</h3>
                            <ul className="text-green-100 space-y-2 text-left">
                                <li>• Quality assurance</li>
                                <li>• Competitive pricing</li>
                                <li>• Diverse product range</li>
                                <li>• Reliable delivery</li>
                                <li>• Easy comparison tools</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="section-cta" className={`py-20 bg-white transition-all duration-1000 delay-700 ${isVisible['section-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Ready to Transform Your Agricultural Business?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of successful farmers and traders who have already discovered the power of our platform.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button className="group bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center">
                Start Trading Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
                        </button>
                        <button className="group bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                Contact Sales
              </span>
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help Getting Started?</h3>
                        <p className="text-gray-600 mb-6">
                            Our support team is here to guide you through every step of the process.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:support@farmingmarketplace.com" className="flex items-center justify-center text-green-600 hover:text-green-700 font-medium">
                                <Mail className="w-4 h-4 mr-2" />
                                support@farmingmarketplace.com
                            </a>
                            <a href="tel:+94123456789" className="flex items-center justify-center text-green-600 hover:text-green-700 font-medium">
                                <Phone className="w-4 h-4 mr-2" />
                                +94 12 345 6789
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LearnMore;
