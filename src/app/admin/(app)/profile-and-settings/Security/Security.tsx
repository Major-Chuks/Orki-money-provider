import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import classes from "./Security.module.css";
import Button from "@/components/CustomInput/Button/Button";
import { useState } from "react";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import SettingsHeader from "@/components/app/ProfileAndSettings/SettingsHeader/SettingsHeader";
import SecurityLogs from "../SecurityLogs/SecurityLogs";

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
          <div className={classes.flexContainer}>
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

            <div className={classes.note}>
              Password must be at least 8 characters long and contain uppercase,
              lowercase, numbers, and special characters.
            </div>
          </div>
        </div>

        <div className={classes.btnWrapper}>
          <Button loading={loading} onClick={handleUpdatePassword}>
            Update Password
          </Button>
        </div>
      </div>

      <SecurityLogs />
    </div>
  );
};

export default Security;
