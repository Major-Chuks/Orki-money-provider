export const data: {
  timeStamp: string;
  endpoint: string;
  method: string;
  statusCode: string;
  status: string;
  environment: "Test" | "Production";
}[] = Array(2).fill({
  timeStamp: "2023-04-28 10:30:00",
  endpoint: "/api/transactions",
  method: "GET",
  statusCode: "200",
  status: "Success",
  environment: "Test",
});

export const metadata = {
  total: 2,
  perPage: 10,
  currentPage: 1,
  lastPage: 0,
  firstPage: 1,
  firstPageUrl: "",
  lastPageUrl: "",
  nextPageUrl: null,
  previousPageUrl: null,
};
