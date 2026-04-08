import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations('hiw');

  return (
    <div className="hiw">
      <div className="section-title">{t('title')}</div>
      <div className="hiw-row">
        <div className="hiw-item">
          <div className="hiw-num">1</div>
          <h4>{t('step1Title')}</h4>
          <p>{t('step1Desc')}</p>
        </div>
        <div className="hiw-divider" />
        <div className="hiw-item">
          <div className="hiw-num">2</div>
          <h4>{t('step2Title')}</h4>
          <p>{t('step2Desc')}</p>
        </div>
        <div className="hiw-divider" />
        <div className="hiw-item">
          <div className="hiw-num">3</div>
          <h4>{t('step3Title')}</h4>
          <p>{t('step3Desc')}</p>
        </div>
      </div>
    </div>
  );
}
