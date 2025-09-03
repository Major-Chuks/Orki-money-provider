export const mockData: {
  activity: string;
  ipAddress: string;
  location: string;
  device: string;
  timeStamp: string;
  status: string;
}[] = Array(2).fill({
  activity: "Successful Login",
  ipAddress: "192.168.1.100",
  location: "UAE",
  device: "Chrome on Windows",
  timeStamp: "2024-01-15 09:30:15",
  status: "success",
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
