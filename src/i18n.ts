import { VueI18n, createI18n, LocaleMessages, VueMessageType } from "vue-i18n";

const dateTimeFormats = {
	en: {
		short: {
			year: 'numeric', month: 'numeric', day: 'numeric',
		},
		long: {
			year: '2-digit', month: 'numeric', day: 'numeric',
			hour: 'numeric', minute: 'numeric', hour12: false,
		},
	},
	de: {
		short: {
			day: 'numeric', moth: 'numeric', year: 'numeric',
		},
		long: {
			day: 'numeric', month: 'numeric', year: '2-digit',
			hour: 'numeric', minute: 'numeric',
		},
	},
};

function loadLocaleMessages(): LocaleMessages<VueMessageType> {
	const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
	const messages: LocaleMessages<VueMessageType> = {};
	locales.keys().forEach((key) => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i);
		if (matched && matched.length > 1) {
			const locale = matched[1];
			messages[locale] = locales(key);
		}
	});
	return messages;
}

// Detect default language of browser, and apply it on start
function detectLanguage() {
	// const lng = window.navigator.userLanguage || window.navigator.language || en;
	const lng = window.navigator.language || 'en';
	const locales = require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
	const lang = locales.keys().find((key) => lng.includes(key.replace("./", "").replace(".json", "")));
	return lang ? lang.replace("./", "").replace(".json", "") : null;
}

export default createI18n({
	// legacy: false,
	globalInjection: true,
	// locale: localStorage.getItem("language") || detectLanguage() || process.env.VUE_APP_I18N_LOCALE || 'en',
	locale: process.env.VUE_APP_I18N_LOCALE || 'en',
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
	messages: loadLocaleMessages()
})

