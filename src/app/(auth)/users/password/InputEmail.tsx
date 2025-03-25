import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import emailIcon from "@/assets/auth/email-icon.svg";
import { ErrorState } from "@/components/CustomInput/CustomInput.script";
import { isValidEmail } from "@/services/utils";

const InputEmail = ({
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
  const handleReset = () => {
    // TODO: Trigger an action to send a reset token to user email
    onSubmit();
  };

  return (
    <div className={classes.main}>
      <div className={classes.inputWrapper}>
        <CustomEmailInput
          id="email"
          leftIcon={emailIcon}
          label="Email Address"
          placeholder="name@example.com"
          value={input}
          error={error}
          onChange={onChange}
        />
      </div>

      <CustomButton
        style={{
          background: "#6148C2",
          padding: "16px 8px",
          borderRadius: "12px",
        }}
        disabled={!isValidEmail(input["email"])}
        onClick={handleReset}
      >
        Reset Password
      </CustomButton>
    </div>
  );
};

export default InputEmail;
