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
              "name": "businessname",
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
          "name": "payload",
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
            }
          ]
        }
      ]
    },
    "post_buy_quote": {
      "args": [
        {
          "name": "payload",
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
            }
          ]
        }
      ]
    }
  }
};
