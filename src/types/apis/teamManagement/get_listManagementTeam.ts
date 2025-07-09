export interface get_listManagementTeam {
  data: get_listManagementTeam_Sub1[];
}

interface get_listManagementTeam_Sub1 {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  created_at: string;
  role: string;
  status: string;
  avatar: null;
  is_active: boolean;
}