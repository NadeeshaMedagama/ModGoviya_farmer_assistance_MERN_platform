import { useTranslation } from 'react-i18next';

export const useTranslations = () => {
    const { t, i18n } = useTranslation();

    const translate = (key, options = {}) => {
        return t(key, options);
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const currentLanguage = i18n.language;

    return {
        t: translate,
        changeLanguage,
        currentLanguage,
        i18n
    };
}; 