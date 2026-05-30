"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import { getPixelConfig } from "@/lib/pixels";
import { generateEventId, sendCAPIEvent } from "@/lib/capi";
import { getVisitorIp } from "@/lib/leadpost";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function Pixels({ locale }: { locale: string }) {
  const { metaPixelId, gtmId } = getPixelConfig(locale);

  // Generated once on the client — same value used for pixel and CAPI
  const [pageViewEventId] = useState(generateEventId);

  useEffect(() => {
    // Fire pixel PageView from here (not the inline script) so the
    // event_id is guaranteed to match the CAPI event_id.
    if (metaPixelId && typeof window.fbq === "function") {
      window.fbq("track", "PageView", {}, { eventID: pageViewEventId });
    }
    getVisitorIp().then((ip) => {
      sendCAPIEvent("PageView", pageViewEventId, { ip });
    });
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && (
        <>
          <Script
            id="gtm-head"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* Meta Pixel — init only. PageView fired from useEffect above
          so pixel event_id and CAPI event_id are always identical. */}
      {metaPixelId && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');`,
          }}
        />
      )}
    </>
  );
}
