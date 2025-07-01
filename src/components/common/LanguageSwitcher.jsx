import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ className = '', variant = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentLanguage, changeLanguage, languages, getCurrentLanguageInfo } = useLanguage();
    const { t } = useTranslation();

    const currentLanguageInfo = getCurrentLanguageInfo();

    const handleLanguageChange = (languageCode) => {
        changeLanguage(languageCode);
        setIsOpen(false);
    };

    const baseClasses = "flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent";

    const variants = {
        default: baseClasses,
        compact: "flex items-center space-x-1 px-2 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
        minimal: "flex items-center space-x-1 px-2 py-1 hover:bg-gray-100 rounded-md transition-all duration-200 focus:outline-none"
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={variants[variant]}
            >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{currentLanguageInfo.flag}</span>
                {variant !== 'minimal' && (
                    <span className="hidden sm:block text-sm font-medium text-gray-700">{currentLanguageInfo.name}</span>
                )}
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
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

            {/* Close dropdown when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default LanguageSwitcher; 