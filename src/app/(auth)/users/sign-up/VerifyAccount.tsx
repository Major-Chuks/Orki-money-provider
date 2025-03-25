import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { formatCounter } from "@/services/utils";
import CustomOTPInput from "@/components/CustomInput/CustomOTPInput/CustomOTPInput";
import classes from "@/app/(auth)/users/password/new/page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { routes } from "@/services/routes";
import logo from "@/assets/logo-3.svg";

const initialCounter = 59;

const VerifyAccount = () => {
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(initialCounter);
  const [resendLoading, setResendLoading] = useState(false);
  const [validateLoading, setValidateLoading] = useState(false);

  const router = useRouter();

  // const handleResendToken = async () => {
  // // check for valid email address

  //   setResendLoading(true);
  //   const response = await backend().post_requestPasswordReset({
  //     email: user-email,
  //   });
  //   if (response) {
  //     dispatch(
  //       setNotification({
  //         type: "success",
  //         message: response.data.message || `Email sent to ${user-email}`,
  //       })
  //     );
  //   }
  //   setResendLoading(false);

  //   setCounter(initialCounter);
  // };

  // const handleValidate = async () => {
  //   setValidateLoading(true);
  //   const response = await backend().get_verifyResetToken({ token: code });
  // // take the user to the next section to create a new password
  //   setValidateLoading(false);
  // };

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

  useEffect(() => {
    // dispatch(resetNotification());
  }, [code]);

  return (
    <div className={classes.container}>
      <div
        onClick={() => router.push(routes.home)}
        className={classes.logoContainer}
      >
        <Image src={logo} alt="" />
      </div>

      <div className={classes.title}>Enter Verification Code</div>

      <div className={classes.main}>
        <div className={classes.description}>
          We sent a verification code to {"darshan@gmail.com."} Please enter the
          code below.
        </div>

        <CustomOTPInput
          style={{ marginBottom: "24px", marginTop: "32px" }}
          onChange={(code) => setCode(code)}
          error={false} // handle notification
        />

        {false && ( // handle notification
          <div className={classes.error}>
            We couldn’t verify this code. please try a new code
          </div>
        )}

        {code.length !== 6 && (
          <div className={classes.note}>
            Didn’t receive a code?{" "}
            {counter ? (
              <span className={classes.counter}>{formatCounter(counter)}</span>
            ) : (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // handleResendToken();
                }}
              >
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
          disabled={code.length !== 6}
          onClick={() => {
            // handleValidate();
          }}
          loading={validateLoading}
        >
          Verify
        </CustomButton>
      </div>
    </div>
  );
};

export default VerifyAccount;
