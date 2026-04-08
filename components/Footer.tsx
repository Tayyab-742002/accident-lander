import { getTranslations } from 'next-intl/server';

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });

  return (
    <div className="footer">
      <p className="footer-disclaimer">{t('disclaimer')}</p>
      <div className="footer-links">
        <a href="#">{t('privacy')}</a>
        <a href="#">{t('terms')}</a>
        <a href="#">{t('doNotSell')}</a>
        <a href="#">{t('disclaimerLink')}</a>
      </div>
      <div className="footer-copy">{t('copy')}</div>
    </div>
  );
}
