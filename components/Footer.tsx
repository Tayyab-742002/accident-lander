import { getTranslations } from 'next-intl/server';
import { getVariantConfig } from '@/lib/variants';
import PrivacyModal from './PrivacyModal';
import DisclaimerModal from './DisclaimerModal';
import TermsModal from './TermsModal';

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const { footerFirmBlock, footerCcpaLink, footerAttAdvLink } = getVariantConfig(locale);

  return (
    <div className="footer">
      {footerFirmBlock && (
        <div className="footer-firm-block">
          <div className="ff-label">{t('firmLabel')}</div>
          <div className="ff-name">{t('firmName')}</div>
          <div className="ff-addr">
            {t('firmAddr').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </div>
          <div className="ff-lic">{t('firmLic')}</div>
        </div>
      )}

      <p className="footer-disclaimer">{t('disclaimer')}</p>

      <div className="footer-links">
        <PrivacyModal />
        <TermsModal />
        {footerCcpaLink && <a href="#">{t('ccpaLink')}</a>}
        <DisclaimerModal />
        {footerAttAdvLink && <a href="#">{t('attAdvLink')}</a>}
      </div>

      <div className="footer-copy">{t('copy')}</div>
    </div>
  );
}
