import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

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
