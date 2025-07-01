# Internationalization (i18n) Implementation Guide

This guide explains how to implement and use the internationalization system in your React application.

## Overview

The application now supports three languages:
- **English (en)** - Default language
- **Sinhala (si)** - සිංහල
- **Tamil (ta)** - தமிழ்

## How It Works

### 1. Language Context (`src/contexts/LanguageContext.js`)
- Manages the current language state across the application
- Provides functions to change language
- Persists language preference in localStorage
- Provides language information (name, flag, code)

### 2. i18n Configuration (`src/i18n.js`)
- Sets up react-i18next with language detection
- Configures fallback language (English)
- Imports translation files for all supported languages

### 3. Translation Files (`src/locales/`)
- `en.json` - English translations
- `si.json` - Sinhala translations  
- `ta.json` - Tamil translations

## How to Use Translations

### In React Components

```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
    const { t } = useTranslation();
    
    return (
        <div>
            <h1>{t('home.hero.title')}</h1>
            <p>{t('home.hero.description')}</p>
        </div>
    );
};
```

### Using the Custom Hook

```jsx
import { useTranslations } from '../hooks/useTranslations';

const MyComponent = () => {
    const { t } = useTranslations();
    
    return (
        <div>
            <h1>{t('home.hero.title')}</h1>
        </div>
    );
};
```

### Changing Language

```jsx
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
    const { changeLanguage } = useLanguage();
    
    const handleLanguageChange = (languageCode) => {
        changeLanguage(languageCode); // 'en', 'si', or 'ta'
    };
    
    return (
        <button onClick={() => handleLanguageChange('si')}>
            Switch to Sinhala
        </button>
    );
};
```

## Translation Key Structure

Translation keys are organized hierarchically:

```json
{
  "header": {
    "home": "Home",
    "features": "Features"
  },
  "home": {
    "hero": {
      "title": "Welcome",
      "description": "Description text"
    }
  }
}
```

## Adding New Translations

### 1. Add to English file first (`src/locales/en.json`)

```json
{
  "newSection": {
    "title": "New Title",
    "description": "New description"
  }
}
```

### 2. Add to Sinhala file (`src/locales/si.json`)

```json
{
  "newSection": {
    "title": "නව මාතෘකාව",
    "description": "නව විස්තරය"
  }
}
```

### 3. Add to Tamil file (`src/locales/ta.json`)

```json
{
  "newSection": {
    "title": "புதிய தலைப்பு",
    "description": "புதிய விளக்கம்"
  }
}
```

### 4. Use in component

```jsx
const { t } = useTranslation();
return <h1>{t('newSection.title')}</h1>;
```

## Language Switcher Component

A reusable `LanguageSwitcher` component is available:

```jsx
import LanguageSwitcher from '../components/common/LanguageSwitcher';

// Default variant
<LanguageSwitcher />

// Compact variant
<LanguageSwitcher variant="compact" />

// Minimal variant
<LanguageSwitcher variant="minimal" />
```

## Best Practices

### 1. Use Descriptive Keys
```jsx
// Good
t('home.hero.title')

// Bad
t('title')
```

### 2. Group Related Translations
```json
{
  "home": {
    "hero": { ... },
    "features": { ... },
    "testimonials": { ... }
  }
}
```

### 3. Use Interpolation for Dynamic Content
```jsx
// In translation file
{
  "welcome": "Welcome, {{name}}!"
}

// In component
t('welcome', { name: 'John' })
```

### 4. Handle Pluralization
```jsx
// In translation file
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items"
}

// In component
t('items', { count: 5 })
```

## Testing Translations

### 1. Switch Languages
- Use the language switcher in the header
- Check that all text updates correctly
- Verify that the language persists on page refresh

### 2. Check for Missing Translations
- If a translation key is missing, the key itself will be displayed
- Add missing translations to all language files

### 3. Test RTL Support (if needed)
- For languages that read right-to-left, consider adding RTL support

## Troubleshooting

### Common Issues

1. **Translation not showing**: Check if the key exists in all language files
2. **Language not persisting**: Verify localStorage is working
3. **Component not updating**: Ensure the component is wrapped in LanguageProvider

### Debug Mode

Enable debug mode in `src/i18n.js`:

```javascript
i18n.init({
    debug: true, // Set to true for debugging
    // ... other options
});
```

## File Structure

```
src/
├── contexts/
│   └── LanguageContext.js
├── hooks/
│   └── useTranslations.js
├── components/
│   └── common/
│       └── LanguageSwitcher.jsx
├── locales/
│   ├── en.json
│   ├── si.json
│   └── ta.json
└── i18n.js
```

## Adding New Languages

1. Add language to `LanguageContext.js`:
```javascript
const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
    { code: 'new', name: 'New Language', flag: '🏳️' } // Add new language
];
```

2. Create translation file `src/locales/new.json`

3. Import in `src/i18n.js`:
```javascript
import newTranslations from './locales/new.json';

const resources = {
    // ... existing languages
    new: {
        translation: newTranslations
    }
};
```

## Performance Considerations

- Translation files are loaded on demand
- Language changes are cached in localStorage
- Consider code splitting for large translation files
- Use lazy loading for language-specific components if needed

This internationalization system provides a robust foundation for multi-language support in your React application. 