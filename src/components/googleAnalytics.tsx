import Script from "next/script";

// GA4 measurement ID for www.kevinliu.studio. Measurement IDs are public by design.
const GA_MEASUREMENT_ID = "G-LM1TVMS1TW";

// Consent Mode v2 defaults must run before gtag.js loads: ads storage is always
// denied, and visitors in the EEA, UK and Switzerland are measured cookieless.
const GA_BOOTSTRAP = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','CH','GB']});
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`;

/**
 * Google Analytics 4 for production deployments only; previews and local dev
 * send nothing. Vercel exposes VERCEL_ENV to the browser bundle as
 * NEXT_PUBLIC_VERCEL_ENV. Route changes are counted by GA4 enhanced
 * measurement (history events), so there is no manual page_view.
 */
export function GoogleAnalytics() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") return null;
  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {GA_BOOTSTRAP}
      </Script>
      <Script
        id="ga-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
