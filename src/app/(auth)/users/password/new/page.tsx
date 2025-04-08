"use client";

import Image from "next/image";
import logo from "@/assets/logo-3.svg";
import classes from "./page.module.css";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";
import {
  ErrorState,
  InputIdState,
  resetValidation,
} from "@/components/CustomInput/CustomInput.script";
import { useEffect, useState } from "react";
import InputEmail from "../InputEmail";
import VerifyEmail from "../VerifyEmail";
import SetPassword from "../SetNewPassword";
import PasswordResetConfirmation from "../PasswordResetConfirmation";

enum Steps {
  INPUT_EMAIL,
  VERIFY_EMAIL,
  SET_NEW_PASSWORD,
  PASSWORD_RESET_CONFIRMATION,
}

export type InputState = {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

const NewPassword = () => {
  const router = useRouter();
  const [error, setError] = useState<ErrorState>({
    email: false,
    password: false,
  });

  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [step, setStep] = useState<Steps>(Steps.INPUT_EMAIL);

  const title = {
    [Steps.INPUT_EMAIL]: "Reset your password",
    [Steps.VERIFY_EMAIL]: "Enter Verification Code",
    [Steps.SET_NEW_PASSWORD]: "Set New Password",
    [Steps.PASSWORD_RESET_CONFIRMATION]: "Password Reset Successful!",
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: InputIdState
  ) => {
    if (id) {
      resetValidation({ id, error, setError });
      setInput((i) => ({ ...i, [id]: event.target.value }));
    }
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div className={classes.container}>
      <div
        onClick={() => router.push(routes.home)}
        className={classes.logoContainer}
      >
        <Image src={logo} alt="" />
      </div>

      <div className={classes.title}>{title[step]}</div>

      {step === Steps.INPUT_EMAIL && (
        <InputEmail
          classes={classes}
          input={input}
          error={error}
          onChange={handleChange}
          onSubmit={() => setStep(Steps.VERIFY_EMAIL)}
        />
      )}

      {step === Steps.VERIFY_EMAIL && (
        <VerifyEmail
          classes={classes}
          input={input}
          onSubmit={(otp) => {
            setStep(Steps.SET_NEW_PASSWORD);
            setInput((i) => ({ ...i, otp }));
          }}
        />
      )}

      {step === Steps.SET_NEW_PASSWORD && (
        <SetPassword
          classes={classes}
          input={input}
          error={error}
          onChange={handleChange}
          onSubmit={() => setStep(Steps.PASSWORD_RESET_CONFIRMATION)}
        />
      )}

      {step === Steps.PASSWORD_RESET_CONFIRMATION && (
        <PasswordResetConfirmation classes={classes} input={input} />
      )}
    </div>
  );
};

export default NewPassword;
