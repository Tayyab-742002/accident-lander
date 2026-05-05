import { getTranslations } from "next-intl/server";

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const settlements = t.raw("settlements") as Array<{
    line1: string;
    line2: string;
    amount: string;
  }>;

  return (
    <div className="hero">
      <div className="section-inner">
        <h1>
          {t("headline1")} {t("headline2")}
          <br />
          <span className="red">{t("headlineNot")}</span> {t("headline3")}
        </h1>

        <p className="hero-sub">{t("sub")}</p>

        {locale !== "en" && (
          <div className="settlements-wrap">
            <div className="settlements-label">{t("settlementsLabel")}</div>
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
        )}
      </div>
    </div>
  );
}
