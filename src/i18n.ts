import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from './locales/EnglishTranslation.json';
import translationDE from './locales/GermanTranslation.json';
import translationPL from './locales/PolishTranslation.json';

const resources = {
    en: {
        translation: translationEN
    },
    de: {
        translation: translationDE
    },
    pl: {
        translation: translationPL
    }
};

i18n
    .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: navigator.language,
        fallbackLng: "en",

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;