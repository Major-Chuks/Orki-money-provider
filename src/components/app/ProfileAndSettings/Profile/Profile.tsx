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
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import { useFetchUserProfileQuery } from "@/services/queryApis";
import { get_fetchUserProfile } from "@/types/apis/userProfile/get_fetchUserProfile";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const inputKeys = {
  firstname: "firstname",
  lastname: "lastname",
  email: "email",
  phone: "phone",
  country: "country",
  avatar: "avatar",
} as const;

type InputTypes = {
  [K in Exclude<keyof typeof inputKeys, "avatar">]: string;
} & {
  avatar: File | null;
};

const Profile = () => {
  const [input, setInput] = useState<InputTypes>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);

  const { data, isPending } = useFetchUserProfileQuery();
  const userProfile: get_fetchUserProfile = data?.data.data;

  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleCountrySelect = (selected: ICountryData) => {
    setInput((i) => ({ ...i, [inputKeys.country]: selected.code }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (!id || !files) return;
    setInput((i) => ({ ...i, [id]: files[0] }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const response = await backend().post_createUserProfile({
      ...input,
      phone: `+${input.phone}`,
    });
    if (response) {
      showToast("Profile updated successfully", "success");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isPending && userProfile) {
      setInput({
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        email: userProfile.email,
        phone: userProfile.phone,
        country: userProfile.country,
        avatar: null,
      });
    }
  }, [isPending, userProfile]);

  return (
    <div className={classes.container}>
      <SettingsHeader
        title="Personal Information"
        description="Update your personal details"
      />

      {isPending ? (
        <LoadingScreen style={{ height: "40vh" }} />
      ) : (
        <>
          <div className={classes.main}>
            <div className={classes.pfp}>
              <div className={classes.avatar}>
                {input.avatar ? (
                  <Image
                    width={120}
                    height={120}
                    src={URL.createObjectURL(input.avatar)}
                    alt=""
                  />
                ) : null}
              </div>
              <ButtonWrapper className={classes.label}>
                <CustomFileUpload
                  id={inputKeys.avatar}
                  accept="image/*"
                  label="Change Picture"
                  onChange={handleFileChange}
                />
              </ButtonWrapper>
            </div>
            <div className={classes.inputWrapper}>
              <CustomTextInput
                id={inputKeys.firstname}
                value={input.firstname}
                placeholder="Enter your first name"
                label="First Name"
                onChange={handleChange}
              />
              <CustomTextInput
                id={inputKeys.lastname}
                value={input.lastname}
                placeholder="Enter your last name"
                label="Last Name"
                onChange={handleChange}
              />
              <CustomEmailInput
                id={inputKeys.email}
                value={input.email}
                placeholder="Enter your email address"
                label="Email Address"
                onChange={handleChange}
              />
              <CustomPhoneInput
                id={inputKeys.phone}
                value={input.phone}
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
            <Button loading={loading} onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
