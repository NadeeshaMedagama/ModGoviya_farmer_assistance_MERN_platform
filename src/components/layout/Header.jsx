import React, { useState, useEffect } from 'react';
import {
    Menu,
    X,
    ChevronDown,
    Leaf,
    Globe,
    ShoppingCart
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const location = useLocation(); // Get current location
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { cart } = useCart();
    const { currentLanguage, changeLanguage, languages, getCurrentLanguageInfo } = useLanguage();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update i18n language when currentLanguage changes
    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage, i18n]);

    const currentLanguageInfo = getCurrentLanguageInfo();

    const NavLink = ({ href, children, active = false, onClick }) => (
        <a
            href={href}
            onClick={onClick}
            className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-200 group ${
                active
                    ? 'text-emerald-600 font-semibold'
                    : 'text-gray-700 hover:text-emerald-600'
            }`}
        >
            <span className="relative z-10">{children}</span>
            <div className={`absolute inset-0 bg-emerald-50 rounded-lg transition-opacity duration-200 ${
                active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></div>
        </a>
    );

    // Helper function to check if a path is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleLanguageChange = (languageCode) => {
        changeLanguage(languageCode);
        setIsLangDropdownOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
                : 'bg-white shadow-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Enhanced Logo */}
                    <Link to="/">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center group cursor-pointer">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                        <Leaf className="text-white w-6 h-6" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80 animate-pulse"></div>
                                </div>
                                <div className="ml-4">
                                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                    ModGoviya
                                </span>
                                    <div className="text-xs text-gray-500 font-medium -mt-1">{t('header.agriculturePlatform')}</div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Enhanced Desktop Navigation */}
                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-1">
                            <NavLink href="/" active={isActive('/')}>{t('header.home')}</NavLink>
                            <NavLink href="/features" active={isActive('/features')}>{t('header.features')}</NavLink>
                            <NavLink href="/marketplace" active={isActive('/marketplace')}>{t('header.marketplace')}</NavLink>
                            <NavLink href="/weather" active={isActive('/weather')}>{t('header.weather')}</NavLink>
                            <NavLink href="/about" active={isActive('/about')}>{t('header.about')}</NavLink>
                        </div>
                    </div>

                    {/* Enhanced Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Professional Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            >
                                <Globe className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">{currentLanguageInfo.flag}</span>
                                <span className="hidden sm:block text-sm font-medium text-gray-700">{currentLanguageInfo.name}</span>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                                                currentLanguage === lang.code ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                                            }`}
                                        >
                                            <span className="text-lg">{lang.flag}</span>
                                            <span className="font-medium">{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Professional Cart Icon */}
                        <Link
                            to="/cart"
                            className="relative p-2.5 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cart.items.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-110">
                                    {cart.items.length > 99 ? '99+' : cart.items.length}
                                </span>
                            )}
                        </Link>

                        {/* Enhanced Login Button */}
                        <a href="/login" className="hidden sm:block relative px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 group overflow-hidden">
                            <span className="relative z-10">{t('header.login')}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </a>

                        {/* Enhanced Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Mobile Menu */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-2 pt-4 pb-6 space-y-2 bg-white border-t border-gray-100">
                        <a
                            href="/"
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isActive('/') ? 'text-emerald-600 bg-emerald-50 font-semibold' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('header.home')}
                        </a>
                        <a
                            href="/features"
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isActive('/features') ? 'text-emerald-600 bg-emerald-50 font-semibold' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('header.features')}
                        </a>
                        <a
                            href="/marketplace"
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isActive('/marketplace') ? 'text-emerald-600 bg-emerald-50 font-semibold' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('header.marketplace')}
                        </a>
                        <a
                            href="/weather"
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isActive('/weather') ? 'text-emerald-600 bg-emerald-50 font-semibold' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('header.weather')}
                        </a>
                        <a
                            href="/about"
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isActive('/about') ? 'text-emerald-600 bg-emerald-50 font-semibold' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('header.about')}
                        </a>

                        {/* Cart link in mobile menu */}
                        <Link
                            to="/cart"
                            className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                isActive('/cart') ? 'text-emerald-600 bg-emerald-50 font-semibold' : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="flex items-center">
                                <ShoppingCart className="w-5 h-5 mr-3" />
                                {t('header.cart')}
                            </span>
                            {cart.items.length > 0 && (
                                <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cart.items.length > 99 ? '99+' : cart.items.length}
                                </span>
                            )}
                        </Link>

                        <a
                            href="/login"
                            className="flex items-center justify-center px-4 py-3 mt-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg shadow-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('header.login')}
                        </a>
                    </div>
                </div>
            </div>

            {/* Close dropdown when clicking outside */}
            {(isLangDropdownOpen || isMenuOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsLangDropdownOpen(false);
                        setIsMenuOpen(false);
                    }}
                ></div>
            )}
        </nav>
    );
};

export default Header;
