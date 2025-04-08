import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { formatCounter } from "@/services/utils";
import CustomOTPInput from "@/components/CustomInput/CustomOTPInput/CustomOTPInput";
import { InputState } from "./new/page";
import backend from "@/services/apis";

const initialCounter = 59;

const VerifyEmail = ({
  classes,
  input: { email },
  onSubmit,
}: {
  input: InputState;
  classes: Record<string, string>;
  onSubmit: (otp: string) => void;
}) => {
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(initialCounter);
  const [resendLoading, setResendLoading] = useState(false);

  const handleResendToken = async () => {
    setResendLoading(true);
    const response = await backend().post_resend_verification_otp({
      email,
    });
    if (response) {
      setCounter(initialCounter);
    }
    setResendLoading(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCount) => {
        if (prevCount === 0) {
          clearInterval(intervalId);
          // Perform action when countdown ends
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <div className={classes.main}>
      <div className={classes.description}>
        We sent a verification code to {email} Please enter the code below.
      </div>

      <CustomOTPInput
        style={{ marginBottom: "24px", marginTop: "32px" }}
        onChange={(otp) => setOtp(otp)}
        error={false} // handle notification
      />

      {false && ( // handle notification
        <div className={classes.error}>
          We couldn’t verify this code. please try a new code
        </div>
      )}

      {otp.length !== 6 && (
        <div className={classes.note}>
          Didn’t receive a code?{" "}
          {counter ? (
            <span className={classes.counter}>{formatCounter(counter)}</span>
          ) : (
            <span style={{ cursor: "pointer" }} onClick={handleResendToken}>
              {resendLoading ? "..." : "Send new code"}
            </span>
          )}
        </div>
      )}

      <CustomButton
        style={{
          background: "#6148C2",
          padding: "16px 8px",
          borderRadius: "12px",
          marginTop: "32px",
        }}
        disabled={otp.length !== 6}
        onClick={() => onSubmit(otp)}
      >
        Validate
      </CustomButton>
    </div>
  );
};

export default VerifyEmail;
