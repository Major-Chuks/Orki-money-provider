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
import briefcaseIcon from "@/assets/auth/briefcase.svg";
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
import VerifyAccount from "../Components/VerifyAccount";
import backend from "@/services/apis";

const roles = [
  { id: "developer", name: "Developer" },
  { id: "product", name: "Product" },
  { id: "executive", name: "Executive" },
  { id: "operations", name: "Operations" },
  { id: "marketing", name: "Marketing" },
];

const industries = [
  { id: "cex", name: "Centralized Exchange (CEX)" },
  { id: "dex", name: "Decentralized Exchange (DEX)" },
  { id: "p2p", name: "P2P Exchange" },
  { id: "nft_marketplace", name: "NFT Marketplace" },
  { id: "nft_gaming", name: "NFT Gaming Platform" },
  { id: "defi_aggregator", name: "DeFi Aggregator" },
  { id: "crypto_payment_gateway", name: "Crypto Payment Gateway" },
  { id: "media_publisher", name: "Media / Content Publisher" },
  { id: "digital_gaming", name: "Digital Gaming" },
  { id: "gambling", name: "Gambling" },
  { id: "other", name: "Other" },
];

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

// add a page to verfiy emails
//

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

  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    if (!id) return;
    resetValidation({ id, error, setError });
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleSelect = (option: Option, id?: InputIdState) => {
    if (!id) return;
    resetValidation({ id, error, setError });
    setInput((i) => ({ ...i, [id]: option.id }));
  };

  const handleCreateAccount = async () => {
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
            id={inputKeys.firstname}
            leftIcon={userIcon}
            label="First Name"
            placeholder="First Name"
            value={input.firstname}
            onChange={handleChange}
            error={error}
          />
          <CustomTextInput
            id={inputKeys.lastname}
            leftIcon={userIcon}
            label="Last Name"
            placeholder="Last Name"
            value={input.lastname}
            onChange={handleChange}
            error={error}
          />
        </div>

        <CustomTextInput
          id={inputKeys.business_name}
          leftIcon={briefcaseIcon}
          label="Business Name"
          placeholder="Business Name"
          value={input.business_name}
          onChange={handleChange}
          error={error}
        />

        <CustomSelect
          id={inputKeys.industry}
          label="Industry"
          options={industries}
          placeholder="Select Industry"
          value={input.industry}
          onSelect={handleSelect}
          error={error}
        />

        <CustomEmailInput
          id={inputKeys.email}
          leftIcon={emailIcon}
          label="Email Address"
          placeholder="name@example.com"
          value={input.email}
          onChange={handleChange}
          error={error}
        />

        <CustomSelect
          id={inputKeys.role}
          label="Role"
          options={roles}
          placeholder="Select Role"
          value={input.role}
          onSelect={handleSelect}
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
