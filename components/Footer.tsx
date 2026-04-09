import { getTranslations } from 'next-intl/server';
import PrivacyModal from './PrivacyModal';
import DisclaimerModal from './DisclaimerModal';
import TermsModal from './TermsModal';

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });

  return (
    <div className="footer">
      <p className="footer-disclaimer">{t('disclaimer')}</p>
      <div className="footer-links">
        <PrivacyModal />
        <TermsModal />
        <DisclaimerModal />
      </div>
      <div className="footer-copy">{t('copy')}</div>
    </div>
  );
}
