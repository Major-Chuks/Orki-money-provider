import { AUTH_API, handleApiCall } from ".";

export const authApi = {
  post_login: async (payload: {
    email: string;
    password: string;
    otp?: string;
  }) => {
    const url = `/login`;
    return handleApiCall(() => AUTH_API.post(url, payload), "post_login");
  },

  post_create_account: async (payload: {
    firstname: string;
    lastname: string;
    business_name: string;
    industry: string;
    email: string;
    role: string;
    password: string;
  }) => {
    const url = `/register`;
    return handleApiCall(
      () => AUTH_API.post(url, payload),
      "post_create_account"
    );
  },

  post_verify_email: async (payload: { email: string; otp: string }) => {
    const url = `/verify-email`;
    return handleApiCall(
      () => AUTH_API.post(url, payload),
      "post_verify_email"
    );
  },

  post_resend_verification_otp: async (payload: { email: string }) => {
    const url = `/resend-verification-otp`;
    return handleApiCall(
      () => AUTH_API.post(url, payload),
      "post_resend_verification_otp"
    );
  },

  post_reset_password_otp: async (payload: { email: string }) => {
    const url = `/reset-password-otp`;
    return handleApiCall(
      () => AUTH_API.post(url, payload),
      "post_reset_password_otp"
    );
  },

  post_change_password: async (payload: {
    email: string;
    password: string;
    otp: string;
  }) => {
    const url = `/change-password`;
    return handleApiCall(
      () => AUTH_API.post(url, payload),
      "post_change_password"
    );
  },
};
