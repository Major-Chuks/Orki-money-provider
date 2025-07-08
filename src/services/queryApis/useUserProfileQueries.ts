// Generated file - DO NOT EDIT
// This file contains React Query hooks for userProfile API

import { userProfileApi } from "../apis/userProfile";

import { useApiQuery, useApiMutation } from ".";



export const useFetchUserProfileQuery = () =>
  useApiQuery(["get_fetchUserProfile"], userProfileApi.get_fetchUserProfile);

export const useCreateUserProfileMutation = () =>
  useApiMutation(userProfileApi.post_createUserProfile);

export const useUpdateBusinessProfileMutation = () =>
  useApiMutation(userProfileApi.patch_updateBusinessProfile);

export const useFetchBusinessProfileQuery = () =>
  useApiQuery(["get_fetchBusinessProfile"], userProfileApi.get_fetchBusinessProfile);

export const useUpdateBillingInfoMutation = () =>
  useApiMutation(userProfileApi.patch_updateBillingInfo);

export const useFetchBillingInfoQuery = () =>
  useApiQuery(["get_fetchBillingInfo"], userProfileApi.get_fetchBillingInfo);

export const useUpdatePasswordMutation = () =>
  useApiMutation(userProfileApi.patch_updatePassword);

export const useEnable2faMutation = () =>
  useApiMutation(userProfileApi.patch_enable2fa);

export const useDisable2faMutation = () =>
  useApiMutation(userProfileApi.patch_disable2fa);

export const useFetch2faQuery = () =>
  useApiQuery(["get_fetch2fa"], userProfileApi.get_fetch2fa);

export const useConfirm2faMutation = () =>
  useApiMutation(userProfileApi.patch_confirm2fa);

export const useUpdateWidgetThemeMutation = () =>
  useApiMutation(userProfileApi.patch_updateWidgetTheme);

export const useFetchWidgetThemeQuery = () =>
  useApiQuery(["get_fetchWidgetTheme"], userProfileApi.get_fetchWidgetTheme);

export const useLogoutMutation = () =>
  useApiMutation(userProfileApi.post_logout);

export const useFetchNotificationEventsQuery = () =>
  useApiQuery(["get_fetchNotificationEvents"], userProfileApi.get_fetchNotificationEvents);

export const useUpdateNotificationEventsMutation = () =>
  useApiMutation(userProfileApi.patch_updateNotificationEvents);
