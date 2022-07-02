const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,

	pluginOptions: {
		i18n: {
			locale: 'de',
			fallbackLocale: 'en',
			localeDir: 'locales',
			enableLegacy: false,
			runtimeOnly: false,
			compositionOnly: false,
			fullInstall: true
		},
		devServer: {
		  disableHostCheck: true,
		  watchOptions: {
			poll: true
		  }
		}
	}
})
