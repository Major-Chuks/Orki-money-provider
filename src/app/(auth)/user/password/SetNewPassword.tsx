import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import { ErrorState } from "@/components/CustomInput/CustomInput.script";
import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import lockIcon from "@/assets/auth/lock-icon.svg";
import CustomPasswordValidator from "@/components/CustomInput/CustomPasswordValidator/CustomPasswordValidator";
import { InputState } from "./new/page";
import { useState } from "react";
import backend from "@/services/apis";

const SetPassword = ({
  error,
  input,
  classes,
  onChange,
  onSubmit,
}: {
  error: ErrorState;
  input: InputState;
  classes: Record<string, string>;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleCreatePassword = async () => {
    setLoading(true);
    const { email, password, otp } = input;
    const response = await backend().post_change_password({
      email,
      password,
      otp,
    });
    if (response) {
      onSubmit();
    }
    setLoading(false);
  };

  return (
    <div className={classes.main}>
      <div className={classes.inputWrapper}>
        <CustomPasswordInput
          id="password"
          leftIcon={lockIcon}
          label="Password"
          placeholder="Your password"
          value={input}
          onChange={onChange}
          error={error}
        />

        <CustomPasswordInput
          id="confirmPassword"
          leftIcon={lockIcon}
          label="Confirm Password"
          placeholder="Re enter password"
          value={input}
          onChange={onChange}
          error={error}
        />

        <CustomPasswordValidator password={input["password"]} />
      </div>

      <CustomButton
        style={{
          background: "#6148C2",
          padding: "16px 8px",
          borderRadius: "12px",
        }}
        disabled={input["password"] !== input["confirmPassword"]}
        loading={loading}
        onClick={handleCreatePassword}
      >
        Reset Password
      </CustomButton>
    </div>
  );
};

export default SetPassword;
