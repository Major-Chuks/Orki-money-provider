export const mockData: {
  clientName: string;
  clientId: string;
  signUpDate: string;
  accountStatus: {
    status: string;
    timeleft: string;
  };
  kybStatus: string;
  currentPlan: string;
  industry: string;
  country: string;
  action: unknown;
}[] = Array(10).fill({
  clientName: "GlobalTrade",
  clientId: "CL-6609898D",
  signUpDate: "Aug 14, 2025",
  accountStatus: {
    status: "Trial",
    timeLeft: "16days left",
  },
  kybStatus: "Approved",
  currentPlan: "Custom",
  industry: "E-commerce",
  country: "UAE",
  action: "",
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
