import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import { useState } from "react";
import CustomOTPInput from "@/components/CustomInput/CustomOTPInput/CustomOTPInput";
import classes from "@/app/(auth)/user/password/new/page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { routes } from "@/services/routes";
import logo from "@/assets/logo-3.svg";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import { useDispatch } from "react-redux";
import { setAccessToken, setCurrentUser } from "@/redux/slices/user";
import { clearError } from "@/redux/slices/error";

const Verify2fa = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const router = useRouter();
  const dispatch = useDispatch();

  const handleVerify = async () => {
    setLoading(true);

    const response = await backend().post_login({
      email,
      password,
      otp: code,
    });
    if (response) {
      dispatch(setAccessToken(response.data.data.access_token));
      const userResponse = await backend().get_fetchUserProfile();
      if (userResponse) {
        dispatch(setCurrentUser(userResponse.data.data));
      }
      showToast("You're in! Redirecting to your dashboard...", "success");
      dispatch(clearError());
      router.push(routes.dashboard);
    } else {
      dispatch(setAccessToken(null));
    }

    setLoading(false);
  };

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
          Enter the 6-digit code from your authenticator app
        </div>

        <CustomOTPInput
          style={{ marginBottom: "24px", marginTop: "32px" }}
          onChange={(otp) => setCode(otp)}
          error={false} // handle notification
        />

        <CustomButton
          style={{
            background: "#6148C2",
            padding: "16px 8px",
            borderRadius: "12px",
            marginTop: "32px",
          }}
          disabled={code.length !== 6}
          onClick={handleVerify}
          loading={loading}
        >
          Verify
        </CustomButton>
      </div>
    </div>
  );
};

export default Verify2fa;
