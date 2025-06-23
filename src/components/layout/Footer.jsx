import React, { useState } from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Phone,
    Mail,
    MapPin,
    Globe,
    Send,
    Check
}
    from 'lucide-react';
import axios from 'axios';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async () => {
        setError(null);     // Clear previous errors
        if (!email) {
            setError('Please enter an email address');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/subscribe', { email });

            if (response.data.message === 'Subscription successful') {
                setIsSubscribed(true);
                setEmail('');
                setTimeout(() => setIsSubscribed(false), 3000);
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Subscription failed');
            } else {
                setError('Network error. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 lg:col-span-2">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">M</span>
                            </div>
                            <span className="ml-3 text-2xl font-bold">ModGoviya</span>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Empowering Sri Lankan farmers with modern technology and community support. Join us in
                            revolutionizing agriculture for a sustainable future.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                                <Facebook size={24}/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                                <Twitter size={24}/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                                <Instagram size={24}/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                                <Linkedin size={24}/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-green-400">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
                            <li><a href="/features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a></li>
                            <li><a href="/marketplace" className="text-gray-300 hover:text-white transition-colors duration-200">Marketplace</a></li>
                            <li><a href="/weather" className="text-gray-300 hover:text-white transition-colors duration-200">Weather</a></li>
                            <li><a href="/community" className="text-gray-300 hover:text-white transition-colors duration-200">Community</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-green-400">Resources</h3>
                        <ul className="space-y-3">
                            <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">Blog</a></li>
                            <li><a href="/guides" className="text-gray-300 hover:text-white transition-colors duration-200">Farming Guides</a></li>
                            <li><a href="/tutorials" className="text-gray-300 hover:text-white transition-colors duration-200">Tutorials</a></li>
                            <li><a href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200">FAQ</a></li>
                            <li><a href="/support" className="text-gray-300 hover:text-white transition-colors duration-200">Help Center</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-green-400">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Phone size={16} className="mr-3 text-green-500"/>
                                <span className="text-gray-300">+94 11 234 5678</span>
                            </div>
                            <div className="flex items-center">
                                <Mail size={16} className="mr-3 text-green-500"/>
                                <span className="text-gray-300">info@modgoviya.lk</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin size={16} className="mr-3 text-green-500"/>
                                <span className="text-gray-300">Colombo, Sri Lanka</span>
                            </div>
                            <div className="flex items-center">
                                <Globe size={16} className="mr-3 text-green-500"/>
                                <span className="text-gray-300">www.modgoviya.lk</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="max-w-md mx-auto text-center mb-8">
                        <h3 className="text-xl font-semibold mb-3 text-green-400">Stay Updated</h3>
                        <p className="text-gray-300 mb-6">
                            Get the latest farming tips, weather updates, and market insights delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleSubscribe}
                                disabled={isSubscribed || isLoading}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="animate-spin">↻</span>
                                        <span>Subscribing...</span>
                                    </>
                                ) : isSubscribed ? (
                                    <>
                                        <Check size={18} />
                                        <span>Subscribed!</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Subscribe</span>
                                    </>
                                )}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-400 text-sm mt-2 text-center w-full col-span-2">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Bottom Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800">
                        <p className="text-gray-400 text-sm">
                            © 2025 ModGoviya. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms & Conditions</a>
                            <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
                            <a href="/support" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
