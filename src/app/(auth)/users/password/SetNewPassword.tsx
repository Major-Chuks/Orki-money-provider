import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import emailIcon from "@/assets/auth/email-icon.svg";
import { ErrorState } from "@/components/CustomInput/CustomInput.script";
import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import lockIcon from "@/assets/auth/lock-icon.svg";
import CustomPasswordValidator from "@/components/CustomInput/CustomPasswordValidator/CustomPasswordValidator";

const SetPassword = ({
  error,
  input,
  classes,
  onChange,
  onSubmit,
}: {
  error: ErrorState;
  input: Record<string, string>;
  classes: Record<string, string>;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: () => void;
}) => {
  const handleCreatePassword = () => {
    // TODO: create password
    onSubmit();
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
        onClick={handleCreatePassword}
      >
        Reset Password
      </CustomButton>
    </div>
  );
};

export default SetPassword;
