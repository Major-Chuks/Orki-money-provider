export const mockData: {
  invoiceId: string;
  date: string;
  period: string;
  currentPlan: string;
  amount: string;
  status: string;
  paymentMethod: string;
  action: string;
}[] = Array(10).fill({
  invoiceId: "INV-5678763",
  date: "Aug 14, 2025",
  period: "Aug 14 - Sep 14, 2025",
  currentPlan: "Essentials",
  amount: "$199.00",
  status: "Paid",
  paymentMethod: "Visa **** 1234",
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
