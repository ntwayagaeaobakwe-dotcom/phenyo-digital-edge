import { useEffect, useState } from "react";
import {
  analyticsSettingsEventName,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from "@/lib/analytics";
import "./analytics-consent.css";

export function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getAnalyticsConsent() === null);
    const openSettings = () => setVisible(true);
    const eventName = analyticsSettingsEventName();
    window.addEventListener(eventName, openSettings);
    return () => window.removeEventListener(eventName, openSettings);
  }, []);

  if (!visible) return null;

  const choose = (granted: boolean) => {
    setAnalyticsConsent(granted);
    setVisible(false);
  };

  return (
    <aside className="analytics-consent" aria-label="Optional analytics choice">
      <div className="analytics-consent__copy">
        <p className="analytics-consent__title">Your privacy choices</p>
        <p>
          NYG Digital can use Google Analytics to measure page visits and confirmed enquiries. It
          loads only if you allow optional analytics. Form details are never sent to Google.{" "}
          <a href="/cookies">Cookies &amp; Storage</a>
        </p>
      </div>
      <div className="analytics-consent__actions">
        <button type="button" onClick={() => choose(false)}>
          Essential only
        </button>
        <button type="button" className="analytics-consent__accept" onClick={() => choose(true)}>
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
