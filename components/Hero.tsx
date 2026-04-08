import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const settlements = t.raw('settlements') as Array<{ line1: string; line2: string; amount: string }>;

  return (
    <div className="hero">
      <div className="urgency-bar">
        <div className="urgency-dot" />
        {t('urgency')}
      </div>

      <h1>
        {t('headline1')}
        <br />
        {t('headline2')} <span className="red">{t('headlineNot')}</span> {t('headline3')}
      </h1>

      <p className="hero-sub">{t('sub')}</p>

      <div className="settlements-wrap">
        <div className="settlements-label">{t('settlementsLabel')}</div>
        <div className="settlements-row">
          {settlements.map((s, i) => (
            <div className="settlement-card" key={i}>
              <div className="sc-type">
                {s.line1}
                <br />
                {s.line2}
              </div>
              <div className="sc-amount">{s.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
