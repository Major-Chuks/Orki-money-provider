/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

export function useEcho() {
  const [echo, setEcho] = useState<Echo<any> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      console.log("Window not found");
      return;
    }

    if (!window.Pusher) {
      window.Pusher = Pusher;
    }

    const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === "dev";

    const echoInstance = new Echo({
      broadcaster: "reverb",
      key: process.env.NEXT_PUBLIC_WEBSOCKET_ID!,
      wsHost: "ws.money.orki.io",
      forceTLS: !isDev,
      enabledTransports: ["ws", "wss"],
      wssPort: isDev ? 80 : 443,
    });

    const connection = (echoInstance.connector as any)?.pusher?.connection;

    const handleConnected = () => {
      console.log("✅ Connected successfully to WebSocket server!");
    };

    if (connection) {
      connection.bind("connected", handleConnected);
    }

    setEcho(echoInstance);

    return () => {
      if (connection) {
        connection.unbind("connected", handleConnected); // ✅ precise unbinding
      }
      echoInstance.leaveAllChannels();
      echoInstance.disconnect();
    };
  }, []);

  return echo;
}
