import { useEffect, useRef } from "react";

const TransakIframe = ({ purchaseLink }: { purchaseLink: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // const queryString = new URLSearchParams({
  //   themeColor: "#5b29ec",
  // } as any).toString();

  useEffect(() => {
    const handleMessage = (message: MessageEvent) => {
      const transakIframe = iframeRef.current?.contentWindow;

      if (message.source !== transakIframe) return;

      // console.log("Event ID: ", message?.data?.event_id);
      // console.log("Data: ", message?.data?.data);

      if (message?.data?.event_id === "TRANSAK_ORDER_SUCCESSFUL") {
        // console.log("Order Data: ", message?.data?.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id="transakIframe"
      // src={`https://global-stg.transak.com/?${queryString}`}
      src={purchaseLink}
      allow="camera;microphone;payment"
      style={{
        height: "100%",
        width: "100%",
        border: "none",
      }}
    ></iframe>
  );
};

export default TransakIframe;
