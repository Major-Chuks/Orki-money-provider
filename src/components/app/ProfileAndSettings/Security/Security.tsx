import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./Security.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { useState } from "react";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import AuthenticatorModal from "../AuthenticatorModal/AuthenticatorModal";
import Verify2faModal from "../AuthenticatorModal/Verify2faModal/Verify2faModal";
import { useFetch2faQuery } from "@/services/queryApis";
import { get_fetch2fa } from "@/types/apis/userProfile/get_fetch2fa";

const inputKeys = {
  currentPassword: "currentPassword",
  newPassword: "newPassword",
  confirmPassword: "confirmPassword",
} as const;

type InputTypes = {
  [K in keyof typeof inputKeys]: string;
};

const Security = () => {
  const [input, setInput] = useState<InputTypes>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [authenticatorInfo, setAuthenticatorInfo] = useState<{
    enable_2fa: boolean;
    google2fa_secret: string;
    qr_code_url: string;
  } | null>(null);
  const [verify2faModal, setVerify2faModal] = useState(false);
  const [enable2faLoading, setEnable2faLoading] = useState(false);

  const {
    data: enable_2fa_Data,
    isPending: enable_2fa_pending,
    refetch,
  } = useFetch2faQuery();
  const isenabled_2fa: get_fetch2fa["enable_2fa"] =
    enable_2fa_Data?.data.data.enable_2fa;

  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    const response = await backend().patch_updatePassword({
      current_password: input.currentPassword,
      password: input.newPassword,
    });
    if (response) {
      showToast("Password updated successfully", "success");
      setInput({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
    setLoading(false);
  };

  const handleEnable2fa = async () => {
    setEnable2faLoading(true);
    const response = await backend().patch_enable2fa();
    if (response) {
      setAuthenticatorInfo(response.data.data);
    }
    setEnable2faLoading(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <SettingsHeader
          title="Change Password"
          description="Update your password to ensure account security"
        />

        <div className={classes.inputWrapper}>
          <CustomPasswordInput
            id={inputKeys.currentPassword}
            value={input.currentPassword}
            placeholder="Enter current password"
            label="Current Password"
            onChange={handleChange}
          />
          <CustomPasswordInput
            id={inputKeys.newPassword}
            value={input.newPassword}
            placeholder="Enter new password"
            label="New Password"
            onChange={handleChange}
          />
          <CustomPasswordInput
            id={inputKeys.confirmPassword}
            value={input.confirmPassword}
            placeholder="Confirm password"
            label="Confirm New Password"
            onChange={handleChange}
            error={
              Boolean(input.confirmPassword) &&
              input.newPassword !== input.confirmPassword
            }
          />
        </div>

        <div className={classes.btnWrapper}>
          <Button loading={loading} onClick={handleUpdatePassword}>
            Update Password
          </Button>
        </div>
      </div>

      <div className={classes.section}>
        <SettingsHeader
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
        />
        <div className={classes.inputWrapper}>
          <div className={classes.toggleWrapper}>
            <div>
              <div className={classes.title}>
                Enable Two-Factor Authentication
              </div>
              <div className={classes.description}>
                Secure your account with an authenticator app
              </div>
            </div>
            {isenabled_2fa ? (
              <Button
                style={{ color: "#374151", borderColor: "#E5E7EB" }}
                variant="outlined"
                onClick={() => setVerify2faModal(true)}
                type="danger"
              >
                Disable 2FA
              </Button>
            ) : (
              <Button
                style={{ color: "#374151", borderColor: "#E5E7EB" }}
                variant="outlined"
                onClick={handleEnable2fa}
                loading={enable2faLoading || enable_2fa_pending}
              >
                Setup 2FA
              </Button>
            )}
          </div>
        </div>
      </div>
      {authenticatorInfo ? (
        <AuthenticatorModal
          onClose={() => setAuthenticatorInfo(null)}
          onContinue={() => {
            setAuthenticatorInfo(null);
            setVerify2faModal(true);
          }}
          data={authenticatorInfo}
        />
      ) : null}
      {verify2faModal ? (
        <Verify2faModal
          onClose={() => {
            setVerify2faModal(false);
            refetch();
          }}
          disable2fa={isenabled_2fa}
        />
      ) : null}
    </div>
  );
};

export default Security;
