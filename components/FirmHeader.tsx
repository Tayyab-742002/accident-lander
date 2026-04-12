import { getTranslations } from 'next-intl/server';

export default async function FirmHeader({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'firmHeader' });

  return (
    <div className="firm-header">
      <div className="firm-logo-wrap">
        <div className="firm-name">
          {t('namePrefix')} <span>{t('nameAccent')}</span>
        </div>
        <div className="firm-tagline">{t('tagline')}</div>
      </div>
      <div className="firm-address">
        <strong>{t('address1')}</strong>
        {t('address2')}
      </div>
      <div className="ca-badge">{t('badge')}</div>
    </div>
  );
}
