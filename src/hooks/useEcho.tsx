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
  const [echo, setEcho] = useState<any | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return console.log("Window not found");
    // Set Pusher on window if not set already
    if (!window.Pusher) {
      window.Pusher = Pusher;
    }

    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "[::1]";

    // Initialize Echo
    const echoInstance = new Echo({
      broadcaster: "reverb",
      key: process.env.NEXT_PUBLIC_WEBSOCKET_ID!,
      wsHost: "ws.money.orki.io",
      forceTLS: !isLocalhost,
      enabledTransports: ["ws", "wss"],
      wsPort: 80,
      wssPort: 443,
    });

    // Only bind if connector is a PusherConnector and has 'pusher'
    if (
      echoInstance.connector &&
      "pusher" in echoInstance.connector &&
      echoInstance.connector.pusher?.connection
    ) {
      echoInstance.connector.pusher.connection.bind("connected", () => {
        console.log("✅ Connected successfully to WebSocket server!");
      });
    }

    setEcho(echoInstance);
  }, []);

  return echo;
}
