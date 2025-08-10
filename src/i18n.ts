import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import pl from './locales/pl.json';
import en from './locales/en.json';

const resources = {
  pl: { translation: pl },
  en: { translation: en },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl', // Set Polish as default language
    fallbackLng: 'pl',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    // Language detection
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n; 