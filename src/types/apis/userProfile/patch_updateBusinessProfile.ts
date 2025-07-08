export interface patch_updateBusinessProfile {
  business_name: string | null;
  business_registered_name: string | null;
  business_website: string | null;
  business_email: string | null;
  business_country: string | null;
  business_phone: string | null;
  business_address: string | null;
  industry: "cex" | "dex" | "p2p" | "nft_marketplace" | "nft_gaming" | "defi_aggregator" | "crypto_payment_gateway" | "media_publisher" | "digital_gaming" | "gambling" | "other";
}
