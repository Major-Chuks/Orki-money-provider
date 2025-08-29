// Generated file - DO NOT EDIT
// This file contains React Query hooks for markup API

import { markupApi } from "../apis/markup";

import { useApiQuery, useApiMutation } from ".";



export const useGlobalarkupSettingsQuery = () =>
  useApiQuery(["get_globalarkupSettings"], markupApi.get_globalarkupSettings);

export const useGlobalMarkupSettingsMutation = () =>
  useApiMutation(markupApi.patch_globalMarkupSettings);

export const useLocalMarkupSettingsQuery = () =>
  useApiQuery(["get_localMarkupSettings"], markupApi.get_localMarkupSettings);

export const useLocalMarkupSettingsMutation = () =>
  useApiMutation(markupApi.patch_localMarkupSettings);
