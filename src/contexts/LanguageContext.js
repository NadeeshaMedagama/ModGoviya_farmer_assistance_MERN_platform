import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
        { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
    ];

    // Load language from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (languageCode) => {
        setCurrentLanguage(languageCode);
        localStorage.setItem('selectedLanguage', languageCode);
    };

    const getCurrentLanguageInfo = () => {
        return languages.find(lang => lang.code === currentLanguage) || languages[0];
    };

    const value = {
        currentLanguage,
        changeLanguage,
        languages,
        getCurrentLanguageInfo
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}; 