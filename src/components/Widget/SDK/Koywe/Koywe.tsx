"use client";

import { useRef, useEffect } from "react";
import classes from "./Koywe.module.css";
import CloseIcon from "@/assets/app/CloseIcon";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

export default function Koywe({
  onClose,
  currencies,
  tokens,
  clientId,
  callbackUrl,
  testing,
}: {
  onClose: () => void;
  currencies: string[];
  tokens: string[];
  clientId: string;
  callbackUrl: string;
  testing?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = async () => {
    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 1000);
    });

    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const iframeUrl = new URL(iframe.src);
      const targetOrigin = iframeUrl.origin;

      iframe.contentWindow.postMessage(
        {
          type: "INIT_KOYWE",
          payload: {
            currencies,
            tokens,
            clientId,
            callbackUrl,
            testing,
          },
        },
        targetOrigin
      );
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "KOYWE_CLOSED") {
        onClose();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <ButtonWrapper className={classes.iconContainer} onClick={onClose}>
          <CloseIcon />
        </ButtonWrapper>
      </div>
      <iframe
        ref={iframeRef}
        src="/sdk/koywe"
        onLoad={handleIframeLoad}
        style={{
          border: "none",
          position: "absolute",
          top: "64px",
          left: 0,
          width: "100%",
          height: "calc(100% - 64px)",
          zIndex: 9999,
          background: "white",
        }}
        title="Koywe Onramp"
      />
    </div>
  );
}
