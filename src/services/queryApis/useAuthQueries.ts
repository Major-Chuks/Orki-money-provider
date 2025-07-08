// Generated file - DO NOT EDIT
// This file contains React Query hooks for auth API

import { authApi } from "../apis/auth";

import { useApiMutation } from ".";



export const useLoginMutation = () =>
  useApiMutation(authApi.post_login);

export const useCreateAccountMutation = () =>
  useApiMutation(authApi.post_create_account);

export const useVerifyEmailMutation = () =>
  useApiMutation(authApi.post_verify_email);

export const useResendVerificationOtpMutation = () =>
  useApiMutation(authApi.post_resend_verification_otp);

export const useResetPasswordOtpMutation = () =>
  useApiMutation(authApi.post_reset_password_otp);

export const useChangePasswordMutation = () =>
  useApiMutation(authApi.post_change_password);
