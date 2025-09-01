/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import logo from "@/assets/logo-3.svg";
import lockIcon from "@/assets/auth/lock-icon.svg";
import emailIcon from "@/assets/auth/email-icon.svg";
import classes from "./page.module.css";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/services/routes";
import {
  ErrorState,
  resetValidation,
  validateInput,
} from "@/components/CustomInput/CustomInput.script";
import { useEffect, useState } from "react";
import backend from "@/services/apis";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setCurrentUser } from "@/redux/slices/user";
import { RootState } from "@/redux/store";
import { clearError } from "@/redux/slices/error";
import VerifyAccount from "../Components/VerifyAccount";
import Verify2fa from "../Components/Verify2fa";
import { useToast } from "@/context/Toast/ToastContext";
import VerifyTeamMember from "../Components/VerifyTeamMember/VerifyTeamMember";

const Login = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({
    email: false,
    password: false,
  });
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [verify2fa, setVerify2fa] = useState(false);

  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");

  const { label, message } = useSelector((state: RootState) => state.error);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    if (!id) return;
    resetValidation({ id, error, setError });
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleLogin = async () => {
    dispatch(clearError());

    setLoading(true);
    const response = await backend().post_login(input);
    if (response) {
      dispatch(setAccessToken(response.data.data.access_token));
      const userResponse = await backend().get_fetchUserProfile();
      if (userResponse) {
        dispatch(setCurrentUser(userResponse.data.data));
      }
      showToast("You're in! Redirecting to your dashboard...", "success");
      router.push(routes.dashboard);
    } else {
      dispatch(setAccessToken(null));
    }
    setLoading(false);
  };

  useEffect(() => {
    const isValid = validateInput({ input: input, setError: () => {} });
    if (isValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input]);

  useEffect(() => {
    const email = window.localStorage.getItem("email");
    if (email) {
      window.localStorage.removeItem("email");
      setInput((i) => ({ ...i, email }));
    }
  }, []);

  useEffect(() => {
    if (label === "post_login" && message.includes("verify")) {
      (async () => {
        const response = await backend().post_resend_verification_otp({
          email: input.email,
        });
        if (response) {
          setVerifyEmail(true);
        }
      })();
    }

    if (
      label === "post_login" &&
      message.toLowerCase().includes("2fa enabled")
    ) {
      setVerify2fa(true);
    }
  }, [label, message]);

  if (inviteToken) {
    return <VerifyTeamMember inviteToken={inviteToken} />;
  }

  if (verifyEmail) {
    return (
      <VerifyAccount
        email={input.email}
        onSubmit={() => setVerifyEmail(false)}
      />
    );
  }

  if (verify2fa) {
    return <Verify2fa email={input.email} password={input.password} />;
  }

  return (
    <div className={classes.container}>
      <div
        onClick={() => router.push(routes.home)}
        className={classes.logoContainer}
      >
        <Image src={logo} alt="" />
      </div>

      <div className={classes.title}>Welcome back!</div>

      <div className={classes.main}>
        <div className={classes.inputWrapper}>
          <CustomEmailInput
            id="email"
            leftIcon={emailIcon}
            label="Email Address"
            placeholder="name@example.com"
            value={input}
            error={error}
            onChange={handleChange}
          />

          <CustomPasswordInput
            id="password"
            leftIcon={lockIcon}
            label="Password"
            placeholder="Your password"
            value={input}
            error={error}
            onChange={handleChange}
          />
        </div>

        <CustomButton
          style={{
            background: "#6148C2",
            padding: "16px 8px",
            borderRadius: "12px",
          }}
          disabled={disabled}
          onClick={handleLogin}
          loading={loading}
        >
          Login
        </CustomButton>

        <div
          onClick={() => router.push(routes.adminNewPassword)}
          className={classes.forgotPassword}
        >
          Forgot your password?
        </div>
      </div>
    </div>
  );
};

export default Login;
