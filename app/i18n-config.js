import RouteMapping from "./utils/route-mapping";

export default {
  seo: false,
  strategy: "prefix_except_default",
  baseUrl: process.env.HOSTNAME || "http://ghivalla.com/",
  locales: [
    { code: "fr", iso: "fr-FR", name: "Français" },
    { code: "en", iso: "en-US", name: "English" },
  ],
  defaultLocale: "en",

  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    fallbackLocale: "en"
  },
  vuex: {
    // Module namespace
    moduleName: 'i18n',
    // If enabled, current app's locale is synced with nuxt-i18n store module
    syncLocale: true,
  },

  parsePages: false,
  pages: RouteMapping,
  vueI18nLoader: false
};