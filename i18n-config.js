 export default {
  strategy: "prefix_except_default",
  baseUrl: process.env.HOSTNAME || "http://ghivalla.com/",
  locales: [
    { code: "fr", iso: "fr-FR", name: "Français" },
    { code: "en", iso: "en-US", name: "English" },
  ],
  defaultLocale: "fr",
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_ghi",
    fallbackLocale: 'fr'
  },
  vuex: {
    // Module namespace
    moduleName: 'i18n',
    // If enabled, current app's locale is synced with nuxt-i18n store module
    syncLocale: true,
  },
}