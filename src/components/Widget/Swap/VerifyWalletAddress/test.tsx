// import {
//   useAppKit,
//   useAppKitAccount,
//   useAppKitProvider,
//   useWalletInfo,
//   useAppKitEvents,
//   useDisconnect,
//   Provider,
// } from "@reown/appkit/react";

// function WalletDemo() {
//   const { open } = useAppKit();
//   const { address, isConnected } = useAppKitAccount();
//   const { walletProvider } = useAppKitProvider<Provider>("eip155");
//   const { walletInfo } = useWalletInfo();
//   const events = useAppKitEvents();
//   const { disconnect } = useDisconnect();

//   useEffect(() => {
//     if (events.some((e) => e.type === "connect")) {
//       console.log("Wallet connected:", address);
//     }
//   }, [events, address]);

//   return (
//     <div>
//       {isConnected ? (
//         <>
//           <p>Connected as: {address}</p>
//           <button onClick={() => disconnect()}>Disconnect</button>
//         </>
//       ) : (
//         <button onClick={() => open({ view: "Connect", namespace: "eip155" })}>
//           Connect Wallet
//         </button>
//       )}
//     </div>
//   );
// }

// chain test

/*

type BlockchainGroup =
  | 'EVM-Compatible'
  | 'Bitcoin-Compatible'
  | 'Cosmos-Based'
  | 'Solana'
  | 'Tron'
  | 'Polkadot / Substrate'
  | 'Tezos'
  | 'Algorand'
  | 'Ripple (XRP)'
  | 'Cardano'
  | 'Unknown or unsupported';

export function detectBlockchainGroup(address: string): BlockchainGroup {
  const addr = address.trim();

  // ✅ EVM-Compatible (ETH, BSC, Polygon, Avalanche C-Chain, Fantom, Arbitrum, Optimism, Base, etc.)
  if (/^0x[a-fA-F0-9]{40}$/.test(addr)) {
    return 'EVM-Compatible';
  }

  // ✅ Bitcoin-Compatible (BTC, LTC, DOGE)
  if (/^1[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return 'Bitcoin-Compatible'; // Legacy
  if (/^3[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return 'Bitcoin-Compatible'; // P2SH
  if (/^bc1[0-9a-z]{39,59}$/.test(addr)) return 'Bitcoin-Compatible'; // SegWit
  if (/^L[1-9A-HJ-NP-Za-km-z]{26,33}$/.test(addr)) return 'Bitcoin-Compatible'; // Litecoin
  if (/^D[5-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr)) return 'Bitcoin-Compatible'; // Dogecoin

  // ✅ Cosmos-Based Chains
  if (/^cosmos1[0-9a-z]{38}$/.test(addr)) return 'Cosmos-Based';
  if (/^bnb1[0-9a-z]{38}$/.test(addr)) return 'Cosmos-Based'; // Binance Chain

  // ✅ Solana
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr)) return 'Solana';

  // ✅ Tron (TRC-20/TRC-10)
  if (/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(addr)) return 'Tron';

  // ✅ Polkadot / Substrate (Polkadot, Kusama, etc.)
  if (/^1[a-z0-9]{47}$/.test(addr)) return 'Polkadot / Substrate';

  // ✅ Tezos
  if (/^tz1[1-9A-HJ-NP-Za-km-z]{33}$/.test(addr)) return 'Tezos';

  // ✅ Algorand
  if (/^[A-Z2-7]{58}$/.test(addr)) return 'Algorand';

  // ✅ Ripple (XRP)
  if (/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(addr)) return 'Ripple (XRP)';

  // ✅ Cardano (Byron & Shelley)
  if (/^Ae2[1-9A-HJ-NP-Za-km-z]+$/.test(addr)) return 'Cardano';
  if (/^addr1[0-9a-z]+$/.test(addr)) return 'Cardano';

  return 'Unknown or unsupported';
}


*/
