export type get_pricing_quote = {
  quoteId: string;
  conversionPrice: number;
  marketConversionPrice: number;
  slippage: number;
  fiatCurrency: string;
  cryptoCurrency: string;
  paymentMethod: string;
  fiatAmount: number;
  cryptoAmount: number;
  isBuyOrSell: "BUY" | "SELL";
  network: string;
  feeDecimal: number;
  totalFee: number;
  feeBreakdown: {
    name: string;
    value: number;
    id: string;
    ids: string[];
  }[];
  nonce: number;
  cryptoLiquidityProvider: string;
  notes: string[];
};
