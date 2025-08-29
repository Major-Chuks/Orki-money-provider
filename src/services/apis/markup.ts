import { BACKEND_API, handleApiCall } from ".";

export const markupApi = {
  get_globalarkupSettings: async () => {
    const url = "/user/markup/global-settings";
    return handleApiCall(() => BACKEND_API.get(url), "get_globalarkupSettings");
  },

  patch_globalMarkupSettings: async (payload: {
    global_offramp: number;
    global_onramp: number;
  }) => {
    const url = "/user/markup/global-settings";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_globalMarkupSettings"
    );
  },

  get_localMarkupSettings: async () => {
    const url = "/user/markup/settings";
    return handleApiCall(() => BACKEND_API.get(url), "get_localMarkupSettings");
  },

  patch_localMarkupSettings: async (
    payload: {
      ramp_id: string;
      onramp_markup: number;
      status: boolean;
      offramp_markup: number;
      ramp_name: string;
    }[]
  ) => {
    const url = "/user/markup/settings";
    return handleApiCall(
      () => BACKEND_API.patch(url, { providers: payload }),
      "patch_localMarkupSettings"
    );
  },
};
