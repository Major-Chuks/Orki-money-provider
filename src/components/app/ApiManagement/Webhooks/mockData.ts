export const data: {
  id: string;
  reference: string;
  url: string;
  retries: number;
  status: string;
  deliveryTime: string;
}[] = Array(10).fill({
  id: "wh_1a2b3c4d5e6f",
  reference: "tx_9z8y7x6w5v",
  deliveryTime: "May 08, 2025, 03:32:15 PM",
  url: "https://api.example...",
  retries: 0,
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
