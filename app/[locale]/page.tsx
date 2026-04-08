import { setRequestLocale } from 'next-intl/server';
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
  setRequestLocale(locale);
  const { sections } = getVariantConfig(locale);

  return (
    <>
      {sections.hero       && <Hero />}
      {sections.quiz       && <QuizSection />}
      {sections.howItWorks && <HowItWorks />}
      {sections.reviews    && <Reviews />}
      {sections.footer     && <Footer />}
    </>
  );
}
