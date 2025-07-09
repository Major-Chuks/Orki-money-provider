/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import logo from "@/assets/logo-3.svg";
import lockIcon from "@/assets/auth/lock-icon.svg";
import emailIcon from "@/assets/auth/email-icon.svg";
import classes from "./VerifyTeamMember.module.css";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import {
  ErrorState,
  resetValidation,
  validateInput,
} from "@/components/CustomInput/CustomInput.script";
import { useEffect, useState } from "react";
import backend from "@/services/apis";
import { useDispatch } from "react-redux";
import { setAccessToken, setCurrentUser } from "@/redux/slices/user";
import { useToast } from "@/context/Toast/ToastContext";
import CustomPasswordValidator from "@/components/CustomInput/CustomPasswordValidator/CustomPasswordValidator";
import { useVerifyInviteTokenQuery } from "@/services/queryApis";
import { get_verifyInviteToken } from "@/types/apis/teamManagement/get_verifyInviteToken";

const VerifyTeamMember = ({ inviteToken }: { inviteToken: string }) => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({
    email: false,
    password: false,
    confirm_password: false,
  });

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isValidPassword, setIsValidPassword] = useState(false);

  const { data, isPending } = useVerifyInviteTokenQuery({
    invite_token: inviteToken,
  });
  const inviteEmail: get_verifyInviteToken["email"] = data?.data.data.email;

  const router = useRouter();
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
    if (!isValidPassword) return;

    setLoading(true);
    const response = await backend().post_login({
      email: input.email,
      password: input.password,
      invite_token: inviteToken,
    });
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
    const isValidInput = validateInput({ input: input, setError: () => {} });
    if (
      isValidInput &&
      input.password === input.confirm_password &&
      isValidPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input, isValidPassword]);

  useEffect(() => {
    const email = window.localStorage.getItem("email");
    if (email) {
      window.localStorage.removeItem("email");
      setInput((i) => ({ ...i, email }));
    }
  }, []);

  useEffect(() => {
    setInput((i) => ({ ...i, email: inviteEmail }));
  }, [inviteEmail]);

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
            disabled={!!inviteToken}
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

          <CustomPasswordInput
            id="confirm_password"
            leftIcon={lockIcon}
            label="Confirm Password"
            placeholder="Re enter password"
            value={input}
            error={error}
            onChange={handleChange}
          />

          <CustomPasswordValidator
            onChange={setIsValidPassword}
            password={input["password"]}
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
          loading={loading || isPending}
        >
          Complete Setup
        </CustomButton>
      </div>
    </div>
  );
};

export default VerifyTeamMember;
