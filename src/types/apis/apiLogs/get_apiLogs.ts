export interface get_apiLogs {
  logs: get_apiLogs_Sub2[];
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

interface get_apiLogs_Sub2 {
  id: string;
  path: string;
  method: string;
  status_code: number;
  status: string;
  created_at: string;
}