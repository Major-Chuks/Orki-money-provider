/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import * as allNetworks from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined");
}

// ✅ Type guard: checks if a value is an AppKitNetwork
function isAppKitNetwork(value: unknown): value is AppKitNetwork {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "nativeCurrency" in value &&
    typeof (value as any).nativeCurrency?.symbol === "string"
  );
}

// ✅ Filter allNetworks values that are AppKitNetwork
export const networks = Object.values(allNetworks).filter(isAppKitNetwork);

// ✅ Create Wagmi Adapter config
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks: networks as unknown as AppKitNetwork[],
});

export const config = wagmiAdapter.wagmiConfig;
