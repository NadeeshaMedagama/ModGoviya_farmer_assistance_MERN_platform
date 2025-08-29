import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Sprout,
    Tractor,
    Users,
    Shield,
    TrendingUp,
    Globe,
    CloudRain,
    BarChart3,
    Leaf,
    Sun,
    Zap
} from 'lucide-react';

const EnhancedHeroSection = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This enables smooth scrolling
        });
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden flex items-center">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm20-16c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zm0 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '80px 80px'
                }} />
            </div>

            {/* Floating Geometric Shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-full animate-float-slow" />
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-lg rotate-45 animate-float-delayed" />
                <div className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-yellow-300/10 to-orange-400/10 rounded-full animate-bounce-slow" />
                <div className="absolute bottom-40 right-16 w-28 h-28 bg-gradient-to-br from-white/5 to-white/10 rounded-lg rotate-12 animate-float-slow" />
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-32 left-20 animate-float-slow">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 shadow-lg">
                        <Sprout className="h-8 w-8 text-green-200" />
                    </div>
                </div>
                <div className="absolute top-24 right-32 animate-float-delayed">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 shadow-lg">
                        <Tractor className="h-8 w-8 text-green-200" />
                    </div>
                </div>
                <div className="absolute bottom-32 left-24 animate-float-slow">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 shadow-lg">
                        <CloudRain className="h-8 w-8 text-green-200" />
                    </div>
                </div>
                <div className="absolute top-1/2 right-24 animate-float-delayed">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 shadow-lg">
                        <BarChart3 className="h-8 w-8 text-green-200" />
                    </div>
                </div>
            </div>

            {/* Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-green-600/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/10 via-transparent to-emerald-700/10" />

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-5xl mx-auto">
                        {/* Animated Badge */}
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 animate-fade-in-up shadow-lg">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-300 rounded-full mr-3 animate-pulse shadow-lg shadow-green-300/50" />
                                <Globe className="h-4 w-4 text-green-200 mr-2" />
                                <span className="text-sm font-semibold text-green-100 tracking-wide">
                                    Trusted by 10,000+ Farmers Worldwide
                                </span>
                            </div>
                        </div>

                        {/* Main Heading with Enhanced Typography */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none animate-fade-in-up animation-delay-200">
                            <span className="block mb-4">Empowering Farmers</span>
                            <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent pb-4 relative">
                                with Modern Technology
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-80" />
                            </span>
                        </h1>

                        {/* Enhanced Subtitle */}
                        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
                            <p className="text-xl md:text-2xl lg:text-3xl text-green-100 leading-relaxed font-light mb-4">
                                Join thousands of farmers revolutionizing agriculture
                            </p>
                            <p className="text-lg md:text-xl text-green-200/90 leading-relaxed">
                                Smart tools, weather insights, and community support - all in one platform
                            </p>
                        </div>

                        {/* Feature Pills with Icons */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-600">
                            <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300">
                                <Shield className="h-5 w-5 text-green-300 mr-3" />
                                <span className="text-sm font-semibold text-white">Secure & Trusted</span>
                            </div>
                            <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300">
                                <TrendingUp className="h-5 w-5 text-green-300 mr-3" />
                                <span className="text-sm font-semibold text-white">AI-Powered Insights</span>
                            </div>
                            <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300">
                                <Users className="h-5 w-5 text-green-300 mr-3" />
                                <span className="text-sm font-semibold text-white">Community Driven</span>
                            </div>
                            <div className="flex items-center bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300">
                                <Zap className="h-5 w-5 text-green-300 mr-3" />
                                <span className="text-sm font-semibold text-white">Real-time Updates</span>
                            </div>
                        </div>

                        {/* Enhanced CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-800">
                            <Link
                                to="/register">
                            <button
                                onClick={scrollToTop}
                                className="group relative overflow-hidden bg-white text-green-700 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative flex items-center justify-center">
                                    Get Started Today
                                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </button>
                            </Link>

                            <Link
                                to="/features">
                            <button
                                onClick={scrollToTop}
                                className="group relative overflow-hidden bg-transparent text-white border-2 border-white/40 backdrop-blur-md px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/60 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative flex items-center justify-center">
                                    Explore Features
                                    <Leaf className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                                </span>
                            </button>
                            </Link>
                        </div>

                        {/* Enhanced Stats Section */}
                        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-1000">
                            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 shadow-lg">
                                <div className="text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                    10K+
                                </div>
                                <div className="text-green-200 font-semibold text-lg">Active Farmers</div>
                                <div className="text-green-300/80 text-sm mt-1">Growing daily</div>
                            </div>

                            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 shadow-lg">
                                <div className="text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                    50+
                                </div>
                                <div className="text-green-200 font-semibold text-lg">Smart Tools</div>
                                <div className="text-green-300/80 text-sm mt-1">AI-powered</div>
                            </div>

                            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 shadow-lg">
                                <div className="text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                                    24/7
                                </div>
                                <div className="text-green-200 font-semibold text-lg">Support</div>
                                <div className="text-green-300/80 text-sm mt-1">Always available</div>
                            </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <div className="flex flex-col items-center text-white/60">
                                <span className="text-xs font-medium mb-2">Scroll to explore</span>
                                <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                                    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @keyframes floatDelayed {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                @keyframes bounceslow {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }

                .animate-float-slow {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: floatDelayed 6s ease-in-out infinite 2s;
                }

                .animate-bounce-slow {
                    animation: bounceShow 4s ease-in-out infinite;
                }

                .animation-delay-200 {
                    animation-delay: 0.2s;
                }

                .animation-delay-400 {
                    animation-delay: 0.4s;
                }

                .animation-delay-600 {
                    animation-delay: 0.6s;
                }

                .animation-delay-800 {
                    animation-delay: 0.8s;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default EnhancedHeroSection;
