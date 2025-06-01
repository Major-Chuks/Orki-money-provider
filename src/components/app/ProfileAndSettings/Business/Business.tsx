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

const inputKeys = {
  businessName: "businessName",
  companyName: "companyName",
  website: "website",
  businessEmail: "businessEmail",
  businessPhoneNumber: "businessPhoneNumber",
  industry: "industry",
  countryOfIncorporation: "countryOfIncorporation",
  businessAddress: "businessAddress",
};

type InputTypes = { [key in keyof typeof inputKeys]: string };

const Business = () => {
  const [input, setInput] = useState<InputTypes>({
    businessName: "",
    companyName: "",
    website: "",
    businessEmail: "",
    businessPhoneNumber: "",
    industry: "",
    countryOfIncorporation: "",
    businessAddress: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleCountrySelect = (selected: ICountryData) => {
    setInput((i) => ({
      ...i,
      [inputKeys.countryOfIncorporation]: selected.name,
    }));
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <SettingsHeader
          title="Client ID"
          description="Unique identifier for your business account"
        />
        <KeyViewer value={"BIZ-QRE5-ZMDM-EBI6"} toggleVisibility={false} />
      </div>

      <div className={classes.main}>
        <SettingsHeader
          title="Business Information"
          description="Update your company details required for KYB verification"
        />

        <div className={classes.inputWrapper}>
          <CustomTextInput
            id={inputKeys.businessName}
            value={input.businessName}
            placeholder="Acme Corporation"
            label="Business Name"
            onChange={handleChange}
          />
          <CustomTextInput
            id={inputKeys.companyName}
            value={input.companyName}
            placeholder="Acme Inc."
            label="Registered Company Name"
            onChange={handleChange}
          />
          <CustomTextInput
            id={inputKeys.website}
            value={input.website}
            placeholder="https://example.com"
            label="Website"
            onChange={handleChange}
          />
          <CustomEmailInput
            id={inputKeys.businessEmail}
            value={input.businessEmail}
            placeholder="business@example.com"
            label="Business Email"
            onChange={handleChange}
          />
          <CustomPhoneInput
            id={inputKeys.businessPhoneNumber}
            value={input.businessPhoneNumber}
            placeholder="+ 971 58 572 0900"
            label="Business Phone Number"
            onChange={handleChange}
          />
          <CustomTextInput
            id={inputKeys.industry}
            value={input.industry}
            placeholder="Decentralized Exchange (DEX)"
            label="Industry"
            onChange={handleChange}
          />
          <CustomCountrySelect
            id={inputKeys.countryOfIncorporation}
            value={input.countryOfIncorporation}
            label="Country of Incorporation"
            onSelect={handleCountrySelect}
          />
          <CustomTextInput
            id={inputKeys.businessAddress}
            value={input.businessAddress}
            placeholder="123 Business Ave, Suite 500 San Francisco, CA 94105 United States"
            label="Registered Business Address"
            onChange={handleChange}
          />
        </div>

        <div className={classes.btnWrapper}>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Business;
