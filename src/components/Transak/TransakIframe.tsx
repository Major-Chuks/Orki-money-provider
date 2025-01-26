import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useRef } from "react";

const TransakIframe: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { width } = useMediaQuery();

  const queryString = new URLSearchParams({
    themeColor: "#5b29ec",
  } as any).toString();

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
    <div
      style={{
        position: "relative",
        width: width > 540 ? "482px" : "100%",
        height: "80vh",
        margin: "auto",
        boxShadow: "0px 2px 50px 0px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
        padding: "32px 24px",
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        id="transakIframe"
        src={`https://global-stg.transak.com/?apiKey=${process.env.NEXT_PUBLIC_TRANSAK_API_KEY}&${queryString}`}
        allow="camera;microphone;payment"
        style={{
          height: "100%",
          width: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default TransakIframe;
