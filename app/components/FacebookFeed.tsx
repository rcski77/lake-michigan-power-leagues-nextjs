"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse: (node?: HTMLElement | undefined) => void;
      };
    };
  }
}

export default function FacebookFeed() {
  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure the SDK is loaded once, then parse just this embed container.
    const loadSdk = () => {
      if (document.getElementById("facebook-jssdk")) {
        window.FB?.XFBML?.parse(embedRef.current ?? undefined);
        return;
      }

      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7";
      script.async = true;
      script.onload = () => window.FB?.XFBML?.parse(embedRef.current ?? undefined);

      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    };

    loadSdk();
  }, []);

  return (
    <div className="space-y-2">
      <div id="fb-root" aria-hidden="true"></div>
      <div
        ref={embedRef}
        className="fb-page"
        data-href="https://www.facebook.com/MJVBA-Power-Leagues-1589426191291638/"
        data-tabs="timeline"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/MJVBA-Power-Leagues-1589426191291638/"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/MJVBA-Power-Leagues-1589426191291638/">
            MJVBA Power Leagues
          </a>
        </blockquote>
      </div>
    </div>
  );
}
