import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getVariantConfig } from '@/lib/variants';
import Hero from '@/components/Hero';
import QuizSection from '@/components/QuizSection';
import HowItWorks from '@/components/HowItWorks';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';

export default async function LanderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 404 for any locale not in the supported list
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const { sections } = getVariantConfig(locale);

  return (
    <>
      {sections.hero       && <Hero locale={locale} />}
      {sections.quiz       && <QuizSection />}
      {sections.howItWorks && <HowItWorks locale={locale} />}
      {sections.reviews    && <Reviews />}
      {sections.footer     && <Footer locale={locale} />}
    </>
  );
}
