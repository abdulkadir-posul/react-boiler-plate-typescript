import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import localeEN from './en.json';
import localeDE from './de.json';

const resources = {
  en: { translation: localeEN },
  de: { translation: localeDE },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: Object.keys(resources),
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
