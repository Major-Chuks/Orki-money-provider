export interface get_apiLogs {
  logs: any[];
  meta: get_apiLogs_Sub1;
}

interface get_apiLogs_Sub1 {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: null;
  previousPageUrl: null;
}