// This file is auto-generated. Do not edit manually.

export interface ApiParameter {
  name: string;
  isOptional: boolean;
  type?: string;
  isObject?: boolean;
  properties?: Array<{
    name: string;
    isOptional: boolean;
    type: string;
  }>;
}

export interface ApiMethod {
  args: ApiParameter[];
}

export interface ApiManifest {
  [module: string]: {
    [method: string]: ApiMethod;
  };
}

export const apiManifest: ApiManifest = {
  "analytics": {
    "get_totalTransactions": {
      "args": [
        {
          "name": "{\r\n    interval,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "interval",
              "isOptional": false,
              "type": "\"1D\" | \"7D\" | \"30D\""
            }
          ]
        }
      ]
    },
    "get_completedTransactions": {
      "args": [
        {
          "name": "{\r\n    interval,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "interval",
              "isOptional": false,
              "type": "\"1D\" | \"7D\" | \"30D\""
            }
          ]
        }
      ]
    },
    "get_totalVolume": {
      "args": [
        {
          "name": "{ interval }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "interval",
              "isOptional": false,
              "type": "\"1D\" | \"7D\" | \"30D\""
            }
          ]
        }
      ]
    },
    "get_failedTransactions": {
      "args": [
        {
          "name": "{\r\n    interval,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "interval",
              "isOptional": false,
              "type": "\"1D\" | \"7D\" | \"30D\""
            }
          ]
        }
      ]
    },
    "get_transactionVolume": {
      "args": [
        {
          "name": "{\r\n    interval,\r\n    currency,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "interval",
              "isOptional": false,
              "type": "\"1D\" | \"7D\" | \"30D\""
            },
            {
              "name": "currency",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_transactionHistory": {
      "args": [
        {
          "name": "{\r\n    interval,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "interval",
              "isOptional": false,
              "type": "\"1D\" | \"7D\" | \"30D\""
            }
          ]
        }
      ]
    },
    "get_topPaymentMethods": {
      "args": [
        {
          "name": "{\r\n    interval,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "interval",
              "isOptional": false,
              "type": "\"1D\" | \"7D\" | \"30D\""
            }
          ]
        }
      ]
    },
    "get_topFiatCurrencies": {
      "args": [
        {
          "name": "{\r\n    interval,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "interval",
              "isOptional": false,
              "type": "\"1D\" | \"7D\" | \"30D\""
            }
          ]
        }
      ]
    }
  },
  "apiKeys": {
    "get_apiKeys": {
      "args": [
        {
          "name": "{ type }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "type",
              "isOptional": false,
              "type": "\"live\" | \"test\""
            }
          ]
        }
      ]
    },
    "post_createApiKey": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "type",
              "isOptional": false,
              "type": "\"live\" | \"test\""
            }
          ]
        }
      ]
    },
    "delete_apiKey": {
      "args": [
        {
          "name": "{ apiKeyId }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "apiKeyId",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    }
  },
  "apiLogs": {
    "get_apiLogs": {
      "args": [
        {
          "name": "{ params }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "params",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    }
  },
  "auth": {
    "post_login": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "email",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "password",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "otp",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "invite_token",
              "isOptional": true,
              "type": "string | undefined"
            }
          ]
        }
      ]
    },
    "post_create_account": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "firstname",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "lastname",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "business_name",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "industry",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "email",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "role",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "password",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "post_verify_email": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "email",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "otp",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "post_resend_verification_otp": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "email",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "post_reset_password_otp": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "email",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "post_change_password": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "email",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "password",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "otp",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    }
  },
  "billing": {
    "get_listBillingPlans": {
      "args": []
    },
    "post_subscribeBilling": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "payment_method_id",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "price_id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_findActiveSubscription": {
      "args": []
    },
    "post_cancelSubscription": {
      "args": []
    },
    "post_resumeSubscription": {
      "args": []
    },
    "post_swapSubscription": {
      "args": [
        {
          "name": "price_id",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "price_id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_listBillingHistory": {
      "args": [
        {
          "name": "{ params }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "params",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_downloadInvoice": {
      "args": [
        {
          "name": "{ invoiceId }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "invoiceId",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "post_addPaymentMethod": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "payment_method_id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_listPaymentMethods": {
      "args": []
    },
    "patch_updatePaymentMethod": {
      "args": [
        {
          "name": "{ id }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "delete_deletePaymentMethod": {
      "args": [
        {
          "name": "{ id }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    }
  },
  "onboarding": {
    "get_initiateKyb": {
      "args": []
    },
    "patch_updateChecklist": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "key",
              "isOptional": false,
              "type": "\"read_checklist\" | \"read_docs\""
            }
          ]
        }
      ]
    }
  },
  "swap": {
    "get_swapPairs": {
      "args": []
    },
    "get_swap": {
      "args": [
        {
          "name": "{ id }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_swapQuote": {
      "args": [
        {
          "name": "{\r\n    pairId,\r\n    amount,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "pairId",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "amount",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "post_initiateSwap": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "source_address",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "input_amount",
              "isOptional": false,
              "type": "number"
            },
            {
              "name": "quote_amount",
              "isOptional": false,
              "type": "number"
            },
            {
              "name": "to_address",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "to_address_tag",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "pair_id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "patch_updateSwap": {
      "args": [
        {
          "name": "{\r\n    id,\r\n    transaction_hash,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "transaction_hash",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    }
  },
  "teamManagement": {
    "get_listManagementTeam": {
      "args": []
    },
    "post_inviteTeamMember": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "role_id",
              "isOptional": false,
              "type": "number"
            },
            {
              "name": "email",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "patch_resendInvite": {
      "args": [
        {
          "name": "{ id }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_verifyInviteToken": {
      "args": [
        {
          "name": "{ invite_token }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "invite_token",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_listRoles": {
      "args": []
    },
    "patch_changeRole": {
      "args": [
        {
          "name": "{\r\n    id,\r\n    role_id,\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "role_id",
              "isOptional": false,
              "type": "number"
            }
          ]
        }
      ]
    },
    "delete_removeTeamMember": {
      "args": [
        {
          "name": "{ id }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "patch_deactivateTeamMember": {
      "args": [
        {
          "name": "{ id }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "patch_activateTeamMember": {
      "args": [
        {
          "name": "{ id }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "id",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    }
  },
  "transactions": {
    "get_transactions": {
      "args": [
        {
          "name": "{ params }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "params",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_findTransaction": {
      "args": [
        {
          "name": "{ transactionId }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "transactionId",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    }
  },
  "userProfile": {
    "get_fetchUserProfile": {
      "args": []
    },
    "post_createUserProfile": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "firstname",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "lastname",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "country",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "phone",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "avatar",
              "isOptional": false,
              "type": "File | null"
            }
          ]
        }
      ]
    },
    "patch_updateBusinessProfile": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "business_name",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "business_registered_name",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "business_website",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "business_email",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "business_country",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "business_phone",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "business_address",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "industry",
              "isOptional": false,
              "type": "\"cex\" | \"dex\" | \"p2p\" | \"nft_marketplace\" | \"nft_gaming\" | \"defi_aggregator\" | \"crypto_payment_gateway\" | \"media_publisher\" | \"digital_gaming\" | \"gambling\" | \"other\""
            }
          ]
        }
      ]
    },
    "get_fetchBusinessProfile": {
      "args": []
    },
    "patch_updateBillingInfo": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "name",
              "isOptional": false,
              "type": "string | null"
            },
            {
              "name": "address",
              "isOptional": false,
              "type": "{ line1: string | null; city: string | null; state: string | null; country: string | null; postal_code: string | null; }"
            }
          ]
        }
      ]
    },
    "get_fetchBillingInfo": {
      "args": []
    },
    "patch_updatePassword": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "current_password",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "password",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "patch_enable2fa": {
      "args": []
    },
    "patch_disable2fa": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "otp",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_fetch2fa": {
      "args": []
    },
    "patch_confirm2fa": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "otp",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "patch_updateWidgetTheme": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "brand_primary_color",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "brand_secondary_color",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "text_primary_color",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "text_secondary_color",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "button_primary_text_color",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "layout_container_background",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "layout_card_background",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "layout_element_border",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "layout_container_border",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "advanced_font_family",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "advanced_border_radius",
              "isOptional": true,
              "type": "string | undefined"
            },
            {
              "name": "advanced_shadow_style",
              "isOptional": true,
              "type": "string | undefined"
            }
          ]
        }
      ]
    },
    "get_fetchWidgetTheme": {
      "args": []
    },
    "post_logout": {
      "args": []
    },
    "get_fetchNotificationEvents": {
      "args": []
    },
    "patch_updateNotificationEvents": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "product",
              "isOptional": false,
              "type": "boolean"
            },
            {
              "name": "marketing",
              "isOptional": false,
              "type": "boolean"
            },
            {
              "name": "transactions",
              "isOptional": false,
              "type": "boolean"
            },
            {
              "name": "security",
              "isOptional": false,
              "type": "boolean"
            }
          ]
        }
      ]
    }
  },
  "utility": {
    "get_fetchFiatCurrencies": {
      "args": []
    }
  },
  "webhook": {
    "patch_subscribeToWebhook": {
      "args": [
        {
          "name": "payload",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "url",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "events",
              "isOptional": false,
              "type": "string[]"
            }
          ]
        }
      ]
    },
    "get_webhookLogs": {
      "args": [
        {
          "name": "{ params }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "params",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_webhooks": {
      "args": []
    },
    "post_retryWebhook": {
      "args": [
        {
          "name": "{ webhookId }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "webhookId",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    }
  },
  "widget": {
    "post_sell_quote": {
      "args": [
        {
          "name": "{\r\n    token,\r\n    ...payload\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "fiat_currency",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "crypto_currency",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "network",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "payment_method",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "crypto_amount",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "token",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "post_buy_quote": {
      "args": [
        {
          "name": "{\r\n    token,\r\n    ...payload\r\n  }",
          "isOptional": false,
          "isObject": true,
          "properties": [
            {
              "name": "fiat_currency",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "crypto_currency",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "network",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "payment_method",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "amount",
              "isOptional": false,
              "type": "string"
            },
            {
              "name": "token",
              "isOptional": false,
              "type": "string"
            }
          ]
        }
      ]
    },
    "get_generateSignatureToken": {
      "args": []
    }
  }
};
