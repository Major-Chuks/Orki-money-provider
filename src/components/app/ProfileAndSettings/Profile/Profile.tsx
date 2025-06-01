import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./Profile.module.css";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import CustomPhoneInput from "@/components/CustomInput/CustomPhoneInput/CustomPhoneInput";
import CustomCountrySelect from "@/components/CustomInput/CustomCountrySelect/CustomCountrySelect";
import Button from "@/components/CustomInput/Button/Button";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { useEffect, useState } from "react";
import { ICountryData } from "@/constants/country";
import CustomFileUpload from "@/components/CustomInput/CustomFileUpload/CustomFileUpload";
import Image from "next/image";

const inputKeys = {
  fullName: "fullName",
  emailAddress: "emailAddress",
  phoneNumber: "phoneNumber",
  country: "country",
  pfp: "pfp",
} as const;

type InputTypes = {
  [K in Exclude<keyof typeof inputKeys, "pfp">]: string;
} & {
  pfp: File | null;
};

const Profile = () => {
  const [input, setInput] = useState<InputTypes>({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    country: "",
    pfp: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleCountrySelect = (selected: ICountryData) => {
    setInput((i) => ({ ...i, [inputKeys.country]: selected.name }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (!id || !files) return;
    setInput((i) => ({ ...i, [id]: files[0] }));
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div className={classes.container}>
      <SettingsHeader
        title="Personal Information"
        description="Update your personal details"
      />

      <div className={classes.main}>
        <div className={classes.pfp}>
          <div className={classes.avatar}>
            {input.pfp ? (
              <Image
                width={120}
                height={120}
                src={URL.createObjectURL(input.pfp)}
                alt=""
              />
            ) : null}
          </div>
          <ButtonWrapper className={classes.label}>
            <CustomFileUpload
              id={inputKeys.pfp}
              label="Change Picture"
              onChange={handleFileChange}
            />
          </ButtonWrapper>
        </div>
        <div className={classes.inputWrapper}>
          <CustomTextInput
            id={inputKeys.fullName}
            value={input.fullName}
            placeholder="Enter your full name"
            label="Full Name"
            onChange={handleChange}
          />
          <CustomEmailInput
            id={inputKeys.emailAddress}
            value={input.emailAddress}
            placeholder="Enter your email address"
            label="Email Address"
            onChange={handleChange}
          />
          <CustomPhoneInput
            id={inputKeys.phoneNumber}
            value={input.phoneNumber}
            placeholder="Enter your phone number"
            label="Phone Number"
            onChange={handleChange}
          />
          <CustomCountrySelect
            id={inputKeys.country}
            value={input.country}
            placeholder="Select your country"
            label="Country"
            onSelect={handleCountrySelect}
          />
        </div>
      </div>

      <div className={classes.btnWrapper}>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default Profile;
