"use client";

import classes from "./Page.module.css";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import CustomCheckbox from "@/components/CustomInput/CustomCheckbox/CustomCheckbox";
import { openInNewTab } from "@/services/utils";
import { useEffect, useState } from "react";
import { routes } from "@/services/routes";
import emailIcon from "@/assets/auth/email-icon.svg";
import lockIcon from "@/assets/auth/lock-icon.svg";
import Image from "next/image";
import logo from "@/assets/logo-3.svg";
import { useRouter } from "next/navigation";
import {
  ErrorState,
  resetValidation,
  validateInput,
} from "@/components/CustomInput/CustomInput.script";
import VerifyAccount from "../Components/VerifyAccount";
import backend from "@/services/apis";
import CustomPasswordValidator from "@/components/CustomInput/CustomPasswordValidator/CustomPasswordValidator";

const inputKeys = {
  firstname: "firstname",
  lastname: "lastname",
  business_name: "business_name",
  industry: "industry",
  email: "email",
  role: "role",
  password: "password",
  confirmPassword: "confirmPassword",
};

type InputType = { [key in keyof typeof inputKeys]: string };

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<ErrorState>({
    firstname: false,
    lastname: false,
    business_name: false,
    industry: false,
    email: false,
    role: false,
    password: false,
    confirmPassword: false,
  });
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<InputType>({
    firstname: "",
    lastname: "",
    business_name: "",
    industry: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [isValidPassword, setIsValidPassword] = useState(false);

  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    if (!id) return;
    resetValidation({ id, error, setError });
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleCreateAccount = async () => {
    if (!isValidPassword) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = input;
    setLoading(true);
    const response = await backend().post_create_account(payload);
    if (response) {
      setVerifyAccount(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    const isValidInput = validateInput({ input: input, setError: () => {} });
    if (
      isValidInput &&
      isChecked &&
      input.password === input.confirmPassword &&
      isValidPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input, isValidPassword, isChecked]);

  if (verifyAccount) return <VerifyAccount email={input.email} />;

  return (
    <div className={classes.container}>
      <div
        onClick={() => router.push(routes.home)}
        className={classes.logoContainer}
      >
        <Image src={logo} alt="" />
      </div>

      <div>
        <div className={classes.title}>Welcome back to Orki!</div>
        <div className={classes.description}>
          Sign in to access the admin dashboard
        </div>
      </div>

      <div className={classes.inputWrapper}>
        <CustomEmailInput
          id={inputKeys.email}
          leftIcon={emailIcon}
          label="Email Address"
          placeholder="name@example.com"
          value={input.email}
          onChange={handleChange}
          error={error}
        />

        <CustomPasswordInput
          id={inputKeys.password}
          leftIcon={lockIcon}
          label="Password"
          placeholder="Your password"
          value={input.password}
          onChange={handleChange}
          error={error}
        />

        <CustomPasswordInput
          id={inputKeys.confirmPassword}
          leftIcon={lockIcon}
          label="Confirm Password"
          placeholder="Re enter password"
          value={input.confirmPassword}
          onChange={handleChange}
          error={error}
        />

        <CustomPasswordValidator
          onChange={setIsValidPassword}
          password={input["password"]}
        />

        <div className={classes.note}>
          <CustomCheckbox
            value=""
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <div className={classes.noteText}>
            I accept the
            <span onClick={() => openInNewTab({ pathname: routes.termsOfUse })}>
              Terms of Use
            </span>{" "}
            and
            <span
              onClick={() => openInNewTab({ pathname: routes.privacyPolicy })}
            >
              Privacy Policy
            </span>
          </div>
        </div>
      </div>

      <CustomButton
        style={{
          background: "#6148C2",
          padding: "16px 8px",
          borderRadius: "12px",
        }}
        onClick={handleCreateAccount}
        disabled={disabled}
        loading={loading}
      >
        Create account
      </CustomButton>
    </div>
  );
};

export default SignUp;
