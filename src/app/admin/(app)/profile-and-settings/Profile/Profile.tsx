/* eslint-disable @next/next/no-img-element */
import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import classes from "./Profile.module.css";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import Button from "@/components/CustomInput/Button/Button";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { useEffect, useState } from "react";
import CustomFileUpload from "@/components/CustomInput/CustomFileUpload/CustomFileUpload";
import Image from "next/image";
import { useFetchUserProfileQuery } from "@/services/queryApis";
import { get_fetchUserProfile } from "@/types/apis/userProfile/get_fetchUserProfile";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import SettingsHeader from "@/components/app/ProfileAndSettings/SettingsHeader/SettingsHeader";

const inputKeys = {
  firstname: "firstname",
  lastname: "lastname",
  email: "email",
  role: "role",
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
    role: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const { data, isPending } = useFetchUserProfileQuery();
  const userProfile: get_fetchUserProfile = data?.data.data;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    if (!id || !files) return;
    setInput((i) => ({ ...i, [id]: files[0] }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    // const response = await backend().post_createUserProfile({
    //   ...input,
    // });
    // if (response) {
    //   showToast("Profile updated successfully", "success");
    // }
    // const userResponse = await backend().get_fetchUserProfile();
    // if (userResponse) {
    //   dispatch(setCurrentUser(userResponse.data.data));
    // }
    setLoading(false);
  };

  useEffect(() => {
    if (!isPending && userProfile) {
      setInput({
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        email: userProfile.email,
        role: "",
        avatar: null,
      });
      setAvatar(userProfile.avatar);
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
                {avatar ? (
                  <img src={avatar} alt="" />
                ) : input.avatar ? (
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
              <CustomEmailInput
                id={inputKeys.email}
                value={""}
                placeholder="Compliant Officer"
                label="Role"
                onChange={handleChange}
                disabled
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
