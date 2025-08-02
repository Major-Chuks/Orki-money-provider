import { useMutation, useQuery } from "@tanstack/react-query";

// Generic mutation hook
export const useApiMutation = <TData, TVariables>(
  mutationFn: (data: TVariables) => Promise<TData | undefined>
) =>
  useMutation<TData | undefined, unknown, TVariables>({
    mutationFn,
  });

// Generic query hook
export const useApiQuery = <TData>(
  queryKey: string[],
  queryFn: () => Promise<TData | undefined>
) =>
  useQuery<TData | undefined>({
    queryKey,
    queryFn,
  });

// Export all generated query hooks
export * from "./useAnalyticsQueries";
export * from "./useApiKeysQueries";
export * from "./useApiLogsQueries";
export * from "./useAuthQueries";
export * from "./useBillingQueries";
export * from "./useOnboardingQueries";
export * from "./useSwapQueries";
export * from "./useTeamManagementQueries";
export * from "./useTransactionsQueries";
export * from "./useUserProfileQueries";
export * from "./useUtilityQueries";
export * from "./useWebhookQueries";
export * from "./useWidgetQueries";
