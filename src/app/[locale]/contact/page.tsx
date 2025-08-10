// src/app/contact/page.tsx
import ContactSection from '@/components/ContactSection'
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations();
  return (
    <main>
      <h1>{t('contact.title')}</h1>
      <ContactSection />
    </main>
  )
}
