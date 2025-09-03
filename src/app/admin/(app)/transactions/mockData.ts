export const data: {
  clientId: string;
  transactionId: string;
  date: string;
  type: "Buy" | "Sell";
  fiatAmount: string;
  cryptoAmount: string;
  paymentMethod: string;
  provider: string;
  status: "Success" | "Pending" | "Failed";
}[] = Array(10).fill({
  clientId: "ID-787265",
  transactionId: "TXN-12345",
  date: "2023-04-28 15:30:22",
  type: "Buy",
  fiatAmount: "1250.00 USD",
  cryptoAmount: "0.0215 BTC",
  paymentMethod: "Credit Card",
  provider: "Transak",
  status: "Success",
});

export const metadata = {
  total: 10,
  perPage: 3,
  currentPage: 1,
  lastPage: 0,
  firstPage: 1,
  firstPageUrl: "",
  lastPageUrl: "",
  nextPageUrl: null,
  previousPageUrl: null,
};
