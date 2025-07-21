export interface get_fetchUserProfile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  country: string;
  avatar: string;
  role: string;
  onboarding: get_fetchUserProfile_Sub1;
}

interface get_fetchUserProfile_Sub1 {
  completed: boolean;
  trial_period_left: string;
  checklist: get_fetchUserProfile_Sub2;
}

interface get_fetchUserProfile_Sub2 {
  read_checklist: get_fetchUserProfile_Sub4;
  read_docs: get_fetchUserProfile_Sub4;
  start_trial: get_fetchUserProfile_Sub4;
  complete_business_details: get_fetchUserProfile_Sub4;
  complete_kyb: get_fetchUserProfile_Sub3;
}

interface get_fetchUserProfile_Sub3 {
  status: boolean;
  message: string;
}

interface get_fetchUserProfile_Sub4 {
  status: boolean;
  message: null;
}