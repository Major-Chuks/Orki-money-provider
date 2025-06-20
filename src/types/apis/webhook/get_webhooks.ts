export interface get_webhooks {
  id: string;
  url: string;
  secret_key: string;
  subscribed_events: string[];
  created_at: string;
  updated_at: string;
}