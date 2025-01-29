import backend from "@/services/apis";

export const fetchPricingQuotes = async () => {
  const queryParams = {
    partnerApiKey: process.env.NEXT_PUBLIC_TRANSAK_API_KEY, // Your API key
    fiatCurrency: "USD", // Fiat currency symbol
    cryptoCurrency: "ETH", // Crypto currency symbol
    isBuyOrSell: "BUY", // BUY or SELL order
    network: "ethereum", // Cryptocurrency network
    paymentMethod: "credit_debit_card", // Payment method
    fiatAmount: 2000, // Amount in fiat currency
    // Additional optional parameters can be added here:
    // cryptoAmount: 0.5,
    // quoteCountryCode: "GB",
  };

  // Build query string from parameters
  const queryString = new URLSearchParams(queryParams as any).toString();
  const response = await backend().get_pricing_quote(queryString);

  if (response) {
    console.log(response);
  }

  return response;
};

export const fetchFiatCurrencies = async () => {
  const response = await backend().get_fiat_currencies();

  if (response) {
    console.log(response);
  }

  return response;
};

export const fetchCryptoCurrencies = async () => {
  const response = await backend().get_crypto_currencies();

  if (response) {
    console.log(response);
  }

  return response;
};

export const fetchCountries = async () => {
  const response = await backend().get_countries();

  if (response) {
    console.log(response);
  }

  return response;
};

export const fetchUserCountry = async () => {
  const response = await backend().get_user_country();

  if (response) {
    console.log(response);
  }

  return response;
};
