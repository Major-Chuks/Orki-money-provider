export const data: {
  invoiceId: string;
  date: string;
  amount: string;
  status: "Paid" | "Refunded" | "Failed";
}[] = Array(10).fill({
  invoiceId: "ID-787265",
  date: "2023-04-28 15:30:22",
  amount: "1250.00 USD",
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
