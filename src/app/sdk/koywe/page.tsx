"use client";

import LoadingIcon from "@/assets/SvgComponents/LoadingIcon";
import { useEffect } from "react";

export default function KoyweIframePage() {
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const trustedOrigins = [
        "http://localhost:4000", // for local dev
        "https://money.orki.io", // for production
      ];

      if (!trustedOrigins.includes(event.origin)) {
        console.warn("Untrusted origin:", event.origin);
        return;
      }

      if (event.data?.type === "INIT_KOYWE") {
        const { KoyweRampSDK } = await import("@koyweforest/koywe-ramp-sdk");
        console.log({ payload: event.data.payload });

        const koywe = new KoyweRampSDK({
          ...event.data.payload,
        });

        koywe.show();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: 100 }}>
      <LoadingIcon width={32} height={32} color="#0d442e" />
    </div>
  );
}
