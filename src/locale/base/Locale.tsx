import filesList from '../list.json';

const Locale = (function () {
    let instance: _Locale;

    return {
        getInstance: function () {
            if (!instance) instance = new _Locale();
            return instance;
        }
    };
})();

type Dictionary = { [lang: string]: Record<string, string> }

class _Locale {
    private static LOCALE_STORAGE_KEY = "locale";

    private currentLocale: string = "";
    private localesDict: Dictionary = {};

    async init() {
        for (const [key, value] of Object.entries(filesList)) {
            try {
                this.localesDict[key] = await require(`../${value}`);
            } catch (e) {
            }
        }

        // No locales defined
        if (Object.keys(this.localesDict).length === 0) return;

        const savedLocale = localStorage.getItem(_Locale.LOCALE_STORAGE_KEY);

        if (savedLocale === null || !this.isInLocales(savedLocale)) {
            this.setLocale(this.selectFirstLocale())
        } else {
            this.currentLocale = savedLocale;
        }
    }

    setLocale(locale: string) {
        localStorage.setItem(_Locale.LOCALE_STORAGE_KEY, locale);
        this.currentLocale = locale;
    }

    translate = (key: string) => this.localesDict[this.currentLocale][key]

    private selectFirstLocale = () => Object.keys(this.localesDict).slice(0, 1)[0];

    private isInLocales = (locale: string) => Object.keys(this.localesDict).includes(locale)
}

export {Locale}
