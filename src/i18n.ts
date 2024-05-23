import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as en from '@/i18n/en.json';
import * as es from '@/i18n/es.json';

const resources = {
    en: {
        translation: en
    },
    es: {
        translation: es
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "es",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });