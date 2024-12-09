export type ICRYPTO_CURRENCY = {
  icon: string;
  name: string;
  network: string;
  id: string;
};

export const CRYPTO_CURRENCY: ICRYPTO_CURRENCY[] = [
  {
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
    name: "Bitcoin",
    network: "Bitcoin",
    id: "btc",
  },
  {
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    name: "Ethereum",
    network: "Ethereum",
    id: "eth",
  },
  {
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.svg",
    name: "USDT",
    network: "Ethereum",
    id: "usdt",
  },
  {
    icon: "https://cryptologos.cc/logos/cardano-ada-logo.svg",
    name: "Cadano",
    network: "Ethereum",
    id: "ADA",
  },
  {
    icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg",
    name: "Binance Coin",
    network: "Ethereum",
    id: "BNB",
  },
];
