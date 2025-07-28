"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { AppKitNetwork } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { networks, projectId, wagmiAdapter } from "../config";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "Orki-Money",
  description: "Swap",
  url: "https://orki-money.vercel.app/", // origin must match your domain & subdomain
  icons: ["https://orki-money.vercel.app/_next/static/media/logo.2ff79353.svg"],
};

// Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks as unknown as [AppKitNetwork, ...AppKitNetwork[]], //mainnet, arbitrum,
  defaultNetwork: networks[0] as unknown as AppKitNetwork,
  metadata: metadata,
  themeMode: "light",
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
