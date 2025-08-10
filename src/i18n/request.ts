import createI18nMiddleware from 'next-intl/middleware';

export default createI18nMiddleware({
  locales: ['en', 'es', 'de'],
  defaultLocale: 'en'
}); 