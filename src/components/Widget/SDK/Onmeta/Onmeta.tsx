"use client";

import { useRef, useEffect, useState } from "react";
import classes from "./Onmeta.module.css";
import CloseIcon from "@/assets/app/CloseIcon";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

type OnmetaInitPayload = {
  fiatType: string;
  apiKey: string;
  tokenSymbol: string;
  environment: "staging" | "production";
  metadata: { orderID: string };
  fiatAmount?: number;
  chainId?: string;
  onRamp: "enabled" | "disabled";
  offRamp: "enabled" | "disabled";
};

export default function Onmeta({
  onClose,
  payload,
}: {
  onClose: () => void;
  payload: OnmetaInitPayload;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0); // used to force re-mount

  // Sends payload after iframe is fully loaded
  const handleIframeLoad = async () => {
    await new Promise((res) => setTimeout(res, 1000));

    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const iframeUrl = new URL(iframe.src);
      const targetOrigin = iframeUrl.origin;
      window.localStorage.clear();
      window.sessionStorage.clear();

      iframe.contentWindow.postMessage(
        {
          type: "INIT_ONMETA",
          payload,
        },
        targetOrigin
      );
    }
  };

  useEffect(() => {
    // Reload iframe every time payload changes
    setIframeKey((prev) => prev + 1);
  }, [payload]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "ONMETA_CLOSED") {
        onClose();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onClose]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ButtonWrapper className={classes.iconContainer} onClick={onClose}>
          <CloseIcon />
        </ButtonWrapper>
      </div>

      {/* Re-mounts iframe whenever key changes to ensure fresh widget init */}
      <iframe
        key={iframeKey}
        ref={iframeRef}
        src={`/sdk/onmeta?ts=${Date.now()}`}
        onLoad={handleIframeLoad}
        style={{
          border: "none",
          position: "absolute",
          top: "64px",
          left: 0,
          width: "100%",
          minHeight: "calc(100% - 64px)",
          zIndex: 9999,
          background: "white",
        }}
        title="Onmeta Onramp"
      />
    </div>
  );
}
