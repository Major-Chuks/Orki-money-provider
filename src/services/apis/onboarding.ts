import { BACKEND_API, handleApiCall } from ".";

export const onboardingApi = {
  get_initiateKyb: async () => {
    const url = "/initiate-kyb";
    return handleApiCall(() => BACKEND_API.get(url), "get_initiateKyb");
  },

  patch_updateChecklist: async (payload: {
    key: "read_checklist" | "read_docs";
  }) => {
    const url = "/onboarding/checklist/mark-complete";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_updateChecklist"
    );
  },
};
