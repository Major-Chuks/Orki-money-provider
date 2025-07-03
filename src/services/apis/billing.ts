import { BACKEND_API, handleApiCall } from ".";

export const billingApi = {
  get_listBillingPlans: async () => {
    const url = `/billing/plans`;
    return handleApiCall(() => BACKEND_API.get(url), "get_listBillingPlans");
  },
  post_subscribeBilling: async (payload: {
    payment_method_id: string;
    price_id: string;
  }) => {
    const url = "/billing/subscribe";
    return handleApiCall(
      () => BACKEND_API.post(url, payload),
      "post_subscribeBilling"
    );
  },
  get_findActiveSubscription: async () => {
    const url = "/billing/active-subscription";
    return handleApiCall(
      () => BACKEND_API.get(url),
      "get_findActiveSubscription"
    );
  },
  post_cancelSubscription: async () => {
    const url = "/billing/cancel-subscription";
    return handleApiCall(
      () => BACKEND_API.post(url),
      "post_cancelSubscription"
    );
  },
  post_resumeSubscription: async () => {
    const url = "/billing/resume-subscription";
    return handleApiCall(
      () => BACKEND_API.post(url),
      "post_resumeSubscription"
    );
  },
  post_swapSubscription: async (price_id: { price_id: string }) => {
    const url = "/billing/swap-subscription";
    return handleApiCall(
      () => BACKEND_API.post(url, price_id),
      "post_swapSubscription"
    );
  },
  get_listBillingHistory: async () => {
    const url = "/billing/history";
    return handleApiCall(() => BACKEND_API.get(url), "get_listBillingHistory");
  },
  get_downloadInvoice: async ({ invoiceId }: { invoiceId: string }) => {
    const url = `/billing/invoices/${invoiceId}/download`;
    return handleApiCall(() => BACKEND_API.get(url), "get_downloadInvoice");
  },
  // paymentMthods
  post_addPaymentMethod: async (payload: { payment_method_id: string }) => {
    const url = "/billing/payment-methods";
    return handleApiCall(
      () => BACKEND_API.post(url, payload),
      "post_addPaymentMethod"
    );
  },
  get_listPaymentMethods: async () => {
    const url = "/billing/payment-methods";
    return handleApiCall(() => BACKEND_API.get(url), "get_listPaymentMethods");
  },
  patch_updatePaymentMethod: async ({ id }: { id: string }) => {
    const url = `/billing/payment-methods/set-default`;
    return handleApiCall(
      () => BACKEND_API.patch(url, { payment_method_id: id }),
      "patch_updatePaymentMethod"
    );
  },
  delete_deletePaymentMethod: async ({ id }: { id: string }) => {
    const url = `/billing/payment-methods/${id}/delete`;
    return handleApiCall(
      () => BACKEND_API.delete(url),
      "delete_deletePaymentMethod"
    );
  },
};
