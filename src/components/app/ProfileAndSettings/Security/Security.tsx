import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./Security.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { useEffect, useState } from "react";
import ToggleButton from "../../ToggleButton/ToggleButton";

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
  const [enable2fa, setEnable2fa] = useState(false);
  const [enableSms, setEnableSms] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    console.log({ enable2fa, enableSms });
  }, [enable2fa, enableSms]);

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
          />
        </div>

        <div className={classes.btnWrapper}>
          <Button>Update Password</Button>
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
                Secure your account with an authenticator app or SMS
              </div>
            </div>
            <ToggleButton
              id="2fa"
              onChange={(state) => setEnable2fa(state)}
              value={false}
            />
          </div>
          <div className={classes.toggleWrapper}>
            <div>
              <div className={classes.title}>SMS Recovery</div>
              <div className={classes.description}>
                Receive a recovery code via SMS
              </div>
            </div>
            <ToggleButton
              id="sms"
              onChange={(state) => setEnableSms(state)}
              value={false}
            />
          </div>
        </div>

        <div className={classes.btnWrapper}>
          <Button
            style={{ color: "#374151", borderColor: "#E5E7EB" }}
            variant="outlined"
          >
            Setup 2FA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Security;
