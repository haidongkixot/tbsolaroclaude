import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en', 'es'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
});
