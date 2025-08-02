// Generated file - DO NOT EDIT
// This file contains React Query hooks for billing API

import { billingApi } from "../apis/billing";

import { useApiQuery, useApiMutation } from ".";



export const useListBillingPlansQuery = () =>
  useApiQuery(["get_listBillingPlans"], billingApi.get_listBillingPlans);

export const useSubscribeBillingMutation = () =>
  useApiMutation(billingApi.post_subscribeBilling);

export const useFindActiveSubscriptionQuery = () =>
  useApiQuery(["get_findActiveSubscription"], billingApi.get_findActiveSubscription);

export const useCancelSubscriptionMutation = () =>
  useApiMutation(billingApi.post_cancelSubscription);

export const useResumeSubscriptionMutation = () =>
  useApiMutation(billingApi.post_resumeSubscription);

export const useSwapSubscriptionMutation = () =>
  useApiMutation(billingApi.post_swapSubscription);

export const useListBillingHistoryQuery = (params: { params: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_listBillingHistory", JSON.stringify(params)], () =>
    billingApi.get_listBillingHistory(params)
  );

export const useDownloadInvoiceQuery = (params: { invoiceId: string }) =>
    // Add JSON.stringify(params) to queryKey for cache uniqueness
  useApiQuery(["get_downloadInvoice", JSON.stringify(params)], () =>
    billingApi.get_downloadInvoice(params)
  );

export const useAddPaymentMethodMutation = () =>
  useApiMutation(billingApi.post_addPaymentMethod);

export const useListPaymentMethodsQuery = () =>
  useApiQuery(["get_listPaymentMethods"], billingApi.get_listPaymentMethods);

export const useUpdatePaymentMethodMutation = () =>
  useApiMutation(billingApi.patch_updatePaymentMethod);

export const useDeletePaymentMethodMutation = () =>
  useApiMutation(billingApi.delete_deletePaymentMethod);
