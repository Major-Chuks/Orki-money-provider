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
      "args": []
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
    },
    "get_authInfo": {
      "args": []
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
      "args": []
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
  "transactions": {
    "get_transactions": {
      "args": []
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
      "args": []
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
