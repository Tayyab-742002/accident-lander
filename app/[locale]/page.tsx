import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import { getVariantConfig } from "@/lib/variants";
import AdvDisclosureBar from "@/components/AdvDisclosureBar";
import FirmHeader from "@/components/FirmHeader";
import Hero from "@/components/Hero";
import QuizSection from "@/components/QuizSection";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import TrustedIndicator from "../../components/TrustedIndicator";

const STATE_NAMES: Record<string, string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",
  CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",
  HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",
  KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",
  MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",
  NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",
  NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",
  OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",
  SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",
  VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",
  WI:"Wisconsin",WY:"Wyoming",DC:"Washington DC",
};

export default async function LanderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const { sections } = getVariantConfig(locale);

  const headersList = await headers();
  const stateCode = headersList.get('x-user-state') ?? '';
  const userState = STATE_NAMES[stateCode] ?? '';

  return (
    <>
      {sections.advDisclosureBar && <AdvDisclosureBar locale={locale} />}
      {sections.firmHeader && <FirmHeader locale={locale} />}
      {sections.hero && <Hero locale={locale} />}

      {sections.quiz && <QuizSection locale={locale} userState={userState} />}
      {sections.trustedIndicator && (
        <div
          className="quiz-bg"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px 20px",
          }}
        >
          <TrustedIndicator locale={locale} />
        </div>
      )}
      {sections.howItWorks && <HowItWorks locale={locale} />}
      {sections.reviews && <Reviews locale={locale} />}
      {sections.footer && <Footer locale={locale} />}
    </>
  );
}
