// Generated file - DO NOT EDIT
// This file contains React Query hooks for onboarding API

import { onboardingApi } from "../apis/onboarding";

import { useApiQuery, useApiMutation } from ".";



export const useInitiateKybQuery = () =>
  useApiQuery(["get_initiateKyb"], onboardingApi.get_initiateKyb);

export const useUpdateChecklistMutation = () =>
  useApiMutation(onboardingApi.patch_updateChecklist);
