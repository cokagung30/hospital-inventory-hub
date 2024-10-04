import i18next from "i18next";
import Backend from 'i18next-fs-backend';
import { join } from "path";

const i18nPromise = new Promise((resolve, reject) => {

    i18next.use(Backend).init({
        lng: 'en', 
        fallbackLng: 'en',
        ns: ['common', 'category', 'inventory_type'],
        defaultNS: 'category',
        backend: {
            loadPath: join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
        },
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    }, (err) => {
        if (err) {
            console.error('Error initializing i18next:', err);
            reject(err);
        } else {
            console.log('i18next initialized successfully');
            resolve(true);
        }
    });
});


export { i18next, i18nPromise };