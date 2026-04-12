import { getTranslations } from 'next-intl/server';

export default async function AdvDisclosureBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'advBar' });

  return (
    <div className="adv-disclosure-bar">
      {t('text')}
    </div>
  );
}
