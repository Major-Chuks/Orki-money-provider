/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoadingIcon from "@/assets/SvgComponents/LoadingIcon";
import { useEffect, useState } from "react";
import classes from "./styles.module.css";

export default function OnmetaIframePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const trustedOrigins = [
        "http://localhost:4000", // <-- your Next.js app
        "https://money.orki.io", // production
      ];

      if (!trustedOrigins.includes(event.origin)) {
        console.warn("Untrusted origin:", event.origin);
        return;
      }

      if (event.data?.type === "INIT_ONMETA") {
        const payload = event.data.payload;

        // Clear existing widget content
        const existingWidget = document.getElementById("widget");
        if (existingWidget) {
          existingWidget.innerHTML = "";
        }

        // Remove old SDK script if it exists
        const oldScript = document.getElementById("onmeta-sdk-script");
        if (oldScript) {
          oldScript.remove();
        }

        const script = document.createElement("script");
        script.src = `https://stg.platform.onmeta.in/onmeta-sdk.js?ts=${Date.now()}`;
        script.id = "onmeta-sdk-script";
        script.async = true;

        script.onload = () => {
          const widget = new (window as any).onMetaWidget({
            elementId: "widget",
            ...payload,
          });

          widget.init();

          widget.on("ONMETA_WIDGET_CLOSE", () => {
            window.parent.postMessage({ type: "ONMETA_CLOSED" }, event.origin);
          });
        };

        document.body.appendChild(script);
        setMounted(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      {!mounted ? (
        <div style={{ textAlign: "center", paddingTop: 100 }}>
          <LoadingIcon width={32} height={32} color="#0d442e" />
        </div>
      ) : (
        <div className={classes.widget} id="widget"></div>
      )}
    </>
  );
}
