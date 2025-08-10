import { useTranslations } from 'next-intl';

export default function HirePage() {
  const t = useTranslations();
  return (
    <h1>{t('nav.hireMe')}</h1>
  );
}
  