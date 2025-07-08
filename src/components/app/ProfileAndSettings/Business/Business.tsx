import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import KeyViewer from "../../KeyViewer/KeyViewer";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./Business.module.css";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import CustomPhoneInput from "@/components/CustomInput/CustomPhoneInput/CustomPhoneInput";
import CustomCountrySelect from "@/components/CustomInput/CustomCountrySelect/CustomCountrySelect";
import { useEffect, useState } from "react";
import Button from "@/components/CustomInput/Button/Button";
import { ICountryData } from "@/constants/country";
import backend from "@/services/apis";
import CustomSelect, {
  Option,
} from "@/components/CustomInput/CustomSelect/CustomSelect";
import { formatText } from "@/services/utils";
import { patch_updateBusinessProfile } from "@/types/apis/userProfile/patch_updateBusinessProfile";
import { InputIdState } from "@/components/CustomInput/CustomInput.script";
import { useToast } from "@/context/Toast/ToastContext";
import { useFetchBusinessProfileQuery } from "@/services/queryApis";
import { get_fetchBusinessProfile } from "@/types/apis/userProfile/get_fetchBusinessProfile";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const inputKeys = {
  business_name: "business_name",
  business_registered_name: "business_registered_name",
  business_website: "business_website",
  business_email: "business_email",
  business_phone: "business_phone",
  industry: "industry",
  business_country: "business_country",
  business_address: "business_address",
};

const Business = () => {
  const { data, isPending } = useFetchBusinessProfileQuery();
  const businessProfile: get_fetchBusinessProfile = data?.data.data;

  const [input, setInput] = useState<patch_updateBusinessProfile>({
    business_name: "",
    business_registered_name: "",
    business_website: "",
    business_email: "",
    business_phone: "",
    industry: "other",
    business_country: "",
    business_address: "",
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleSelect = (option: Option, id?: InputIdState) => {
    if (!id) return;
    setInput((i) => ({ ...i, [id]: option.id }));
  };

  const handleCountrySelect = (selected: ICountryData) => {
    setInput((i) => ({
      ...i,
      [inputKeys.business_country]: selected.code,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const response = await backend().patch_updateBusinessProfile({
      ...input,
      business_phone: `+${input.business_phone}`,
    });
    if (response) {
      showToast("Business info updated successfully", "success");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isPending && businessProfile) {
      setInput({
        business_name: businessProfile.business_name,
        business_registered_name: businessProfile.registered_name,
        business_website: businessProfile.business_website,
        business_email: businessProfile.business_email,
        business_phone: businessProfile.business_phone,
        industry:
          businessProfile.industry as patch_updateBusinessProfile["industry"],
        business_country: businessProfile.business_country,
        business_address: businessProfile.business_address,
      });
    }
  }, [isPending, businessProfile]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <SettingsHeader
          title="Client ID"
          description="Unique identifier for your business account"
        />
        <KeyViewer
          value={businessProfile?.client_id}
          toggleVisibility={false}
        />
      </div>

      <div className={classes.main}>
        <SettingsHeader
          title="Business Information"
          description="Update your company details required for KYB verification"
        />

        {isPending ? (
          <LoadingScreen style={{ height: "40vh" }} />
        ) : (
          <>
            <div className={classes.inputWrapper}>
              <CustomTextInput
                id={inputKeys.business_name}
                value={input.business_name as string}
                placeholder="Acme Corporation"
                label="Business Name"
                onChange={handleChange}
              />
              <CustomTextInput
                id={inputKeys.business_registered_name}
                value={input.business_registered_name as string}
                placeholder="Acme Inc."
                label="Registered Company Name"
                onChange={handleChange}
              />
              <CustomTextInput
                id={inputKeys.business_website}
                value={input.business_website as string}
                placeholder="https://example.com"
                label="Website"
                onChange={handleChange}
              />
              <CustomEmailInput
                id={inputKeys.business_email}
                value={input.business_email as string}
                placeholder="business@example.com"
                label="Business Email"
                onChange={handleChange}
              />
              <CustomPhoneInput
                id={inputKeys.business_phone}
                value={input.business_phone as string}
                placeholder="+ 971 58 572 0900"
                label="Business Phone Number"
                onChange={handleChange}
              />
              <CustomSelect
                id={inputKeys.industry}
                value={input.industry}
                options={[
                  "cex",
                  "dex",
                  "p2p",
                  "nft_marketplace",
                  "nft_gaming",
                  "defi_aggregator",
                  "crypto_payment_gateway",
                  "media_publisher",
                  "digital_gaming",
                  "gambling",
                  "other",
                ].map((el) => ({ id: el, name: formatText(el) }))}
                placeholder="Decentralized Exchange (DEX)"
                label="Industry"
                onSelect={handleSelect}
              />
              <CustomCountrySelect
                id={inputKeys.business_country}
                value={input.business_country as string}
                label="Country of Incorporation"
                onSelect={handleCountrySelect}
              />
              <CustomTextInput
                id={inputKeys.business_address}
                value={input.business_address as string}
                placeholder="123 Business Ave, Suite 500 San Francisco, CA 94105 United States"
                label="Registered Business Address"
                onChange={handleChange}
              />
            </div>

            <div className={classes.btnWrapper}>
              <Button loading={loading} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Business;
