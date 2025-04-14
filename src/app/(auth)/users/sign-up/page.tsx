"use client";

import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import classes from "./Page.module.css";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import CustomSelect, {
  Option,
} from "@/components/CustomInput/CustomSelect/CustomSelect";
import CustomPasswordInput from "@/components/CustomInput/CustomPasswordInput/CustomPasswordInput";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import CustomCheckbox from "@/components/CustomInput/CustomCheckbox/CustomCheckbox";
import { openInNewTab } from "@/services/utils";
import { useEffect, useState } from "react";
import { routes } from "@/services/routes";
import userIcon from "@/assets/auth/user-icon.svg";
import emailIcon from "@/assets/auth/email-icon.svg";
import lockIcon from "@/assets/auth/lock-icon.svg";
import Image from "next/image";
import logo from "@/assets/logo-3.svg";
import { useRouter } from "next/navigation";
import {
  ErrorState,
  InputIdState,
  resetValidation,
  validateInput,
} from "@/components/CustomInput/CustomInput.script";
import VerifyAccount from "./VerifyAccount";
import backend from "@/services/apis";

const roles = [
  { id: "developer", name: "Developer" },
  { id: "product", name: "Product" },
  { id: "executive", name: "Executive" },
  { id: "operations", name: "Operations" },
  { id: "marketing", name: "Marketing" },
];

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<ErrorState>({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    confirmPassword: false,
    role: false,
  });
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: InputIdState
  ) => {
    if (id) {
      resetValidation({ id, error, setError });
      setInput((i) => ({ ...i, [id]: event.target.value }));
    }
  };

  const handleSelect = (option: Option, id?: InputIdState) => {
    if (id) {
      resetValidation({ id, error, setError });
      setInput((i) => ({ ...i, [id]: option.id }));
    }
  };

  const handleCreateAccount = async () => {
    const { confirmPassword, ...payload } = input;
    setLoading(true);
    const response = await backend().post_create_account(payload);
    if (response) {
      setVerifyAccount(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    const isValid = validateInput({ input: input, setError: () => {} });
    if (isValid && isChecked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input, isChecked]);

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
        <div className={classes.title}>Create your account</div>
        <div className={classes.description}>
          Start your crypto journey today
        </div>
      </div>

      <div className={classes.inputWrapper}>
        <div className={classes.group}>
          <CustomTextInput
            id="firstname"
            leftIcon={userIcon}
            label="First Name"
            placeholder="First Name"
            value={input}
            onChange={handleChange}
            error={error}
          />
          <CustomTextInput
            id="lastname"
            leftIcon={userIcon}
            label="Last Name"
            placeholder="Last Name"
            value={input}
            onChange={handleChange}
            error={error}
          />
        </div>

        <CustomEmailInput
          id="email"
          leftIcon={emailIcon}
          label="Email Address"
          placeholder="name@example.com"
          value={input}
          onChange={handleChange}
          error={error}
        />

        <CustomSelect
          id="role"
          label="Role"
          options={roles}
          placeholder="Select Role"
          value={input}
          onSelect={handleSelect}
          error={error}
        />

        <CustomPasswordInput
          id="password"
          leftIcon={lockIcon}
          label="Password"
          placeholder="Your password"
          value={input}
          onChange={handleChange}
          error={error}
        />

        <CustomPasswordInput
          id="confirmPassword"
          leftIcon={lockIcon}
          label="Confirm Password"
          placeholder="Re enter password"
          value={input}
          onChange={handleChange}
          error={error}
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

      <div className={classes.divider}>
        <span></span>
        Or
        <span></span>
      </div>

      <div className={classes.otherOption}>
        Already have an account?{" "}
        <span onClick={() => router.push(routes.login)}>Sign in</span>
      </div>
    </div>
  );
};

export default SignUp;
