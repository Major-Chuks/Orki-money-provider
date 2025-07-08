import { BACKEND_API, handleApiCall } from ".";

export const userProfileApi = {
  get_fetchUserProfile: async () => {
    const url = "/user/profile";
    return handleApiCall(() => BACKEND_API.get(url), "get_fetchUserProfile");
  },

  post_createUserProfile: async (payload: {
    firstname: string | null;
    lastname: string | null;
    country: string | null;
    phone: string | null;
    avatar: File | null;
  }) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([Key, value]) => {
      if (value) {
        formData.append(Key, value);
      }
    });

    const url = "/user/profile";
    return handleApiCall(
      () => BACKEND_API.post(url, formData),
      "post_createUserProfile"
    );
  },

  patch_updateBusinessProfile: async (payload: {
    business_name: string | null;
    business_registered_name: string | null;
    business_website: string | null;
    business_email: string | null;
    business_country: string | null;
    business_phone: string | null;
    business_address: string | null;
    industry:
      | "cex"
      | "dex"
      | "p2p"
      | "nft_marketplace"
      | "nft_gaming"
      | "defi_aggregator"
      | "crypto_payment_gateway"
      | "media_publisher"
      | "digital_gaming"
      | "gambling"
      | "other";
  }) => {
    const url = "/user/business-profile";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_updateBusinessProfile"
    );
  },

  get_fetchBusinessProfile: async () => {
    const url = "/user/business-profile";
    return handleApiCall(
      () => BACKEND_API.get(url),
      "get_fetchBusinessProfile"
    );
  },

  patch_updateBillingInfo: async (payload: {
    name: string | null;
    address: {
      line1: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
      postal_code: string | null;
    };
  }) => {
    const url = "/user/billing-info";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_updateBillingInfo"
    );
  },

  get_fetchBillingInfo: async () => {
    const url = "/user/billing-info";
    return handleApiCall(() => BACKEND_API.get(url), "get_fetchBillingInfo");
  },

  patch_updatePassword: async (payload: {
    current_password: string;
    password: string;
  }) => {
    const url = "/user/security/password";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_updatePassword"
    );
  },

  patch_enable2fa: async () => {
    const url = "/user/security/enable-2fa";
    return handleApiCall(() => BACKEND_API.patch(url), "patch_enable2fa");
  },

  patch_disable2fa: async (payload: { otp: string }) => {
    const url = "/user/security/disable-2fa";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_enable2fa"
    );
  },

  get_fetch2fa: async () => {
    const url = "/user/security/2fa";
    return handleApiCall(() => BACKEND_API.get(url), "get_fetch2fa");
  },

  patch_confirm2fa: async (payload: { otp: string }) => {
    const url = "/user/security/2fa/confirmation";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_confirm2fa"
    );
  },

  patch_updateWidgetTheme: async (payload: {
    brand_primary_color?: string; // Max 7 chars
    brand_secondary_color?: string; // Max 7 chars
    text_primary_color?: string; // Max 7 chars
    text_secondary_color?: string; // Max 7 chars
    button_primary_text_color?: string; // Max 7 chars
    layout_container_background?: string; // Max 7 chars
    layout_card_background?: string; // Max 7 chars
    layout_element_border?: string; // Max 7 chars
    layout_container_border?: string; // Max 7 chars
    advanced_font_family?: string; // Max 255 chars
    advanced_border_radius?: string; // Max 50 chars
    advanced_shadow_style?: string; // Max 255 chars
  }) => {
    const url = "/user/appearance/theme-settings";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_updateWidgetTheme"
    );
  },

  get_fetchWidgetTheme: async () => {
    const url = "/user/appearance/theme-settings";
    return handleApiCall(() => BACKEND_API.get(url), "get_fetchWidgetTheme");
  },

  post_logout: async () => {
    const url = "/user/logout";
    return handleApiCall(() => BACKEND_API.post(url), "post_logout");
  },

  get_fetchNotificationEvents: async () => {
    const url = "/user/notifications/settings";
    return handleApiCall(
      () => BACKEND_API.get(url),
      "get_fetchNotificationEvents"
    );
  },

  patch_updateNotificationEvents: async (payload: {
    product: boolean;
    marketing: boolean;
    transactions: boolean;
    security: boolean;
  }) => {
    const url = "/user/notifications/settings";
    return handleApiCall(
      () => BACKEND_API.patch(url, payload),
      "patch_updateNotificationEvents"
    );
  },
};
