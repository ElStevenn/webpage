import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const selected = locale ?? 'en';
  return {
    locale: selected,
    messages: (await import(`../locales/${selected}.json`)).default
  };
}); 