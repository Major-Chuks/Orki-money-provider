"use client";

import Image from "next/image";
import logo from "@/assets/logo-3.svg";
import lockIcon from "@/assets/auth/lock-icon.svg";
import emailIcon from "@/assets/auth/email-icon.svg";
import classes from "./page.module.css";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import {
  ErrorState,
  InputIdState,
  resetValidation,
  validateInput,
} from "@/components/CustomInput/CustomInput.script";
import { useEffect, useState } from "react";
import backend from "@/services/apis";

const Login = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({
    email: false,
    password: false,
  });

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: InputIdState
  ) => {
    if (id) {
      resetValidation({ id, error, setError });
      setInput((i) => ({ ...i, [id]: event.target.value }));
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const response = await backend().post_login(input);
    if (response) {
      router.push(routes.widget);
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
          onClick={() => router.push(routes.newPassword)}
          className={classes.forgotPassword}
        >
          Forgot your password?
        </div>
      </div>

      <div className={classes.otherOption}>
        Already have an account?{" "}
        <span onClick={() => router.push(routes.signUp)}>Sign up</span>
      </div>
    </div>
  );
};

export default Login;
