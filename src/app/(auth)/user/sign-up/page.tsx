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
import VerifyAccount from "./VerifyAccount";
import backend from "@/services/apis";

const roles = [
  { id: "developer", name: "Developer" },
  { id: "product", name: "Product" },
  { id: "executive", name: "Executive" },
  { id: "operations", name: "Operations" },
  { id: "marketing", name: "Marketing" },
];

const industries = [
  { id: "centralizedExchange", name: "Centralized Exchange (CEX)" },
  { id: "decentralizedExchange", name: "Decentralized Exchange (DEX)" },
  { id: "p2pExchange", name: "P2P Exchange" },
  { id: "nftMarketplace", name: "NFT Marketplace" },
  { id: "nftGamingPlatform", name: "NFT Gaming Platform" },
  { id: "defiAggregator", name: "DeFi Aggregator" },
  { id: "cryptoPaymentGateway", name: "Crypto Payment Gateway" },
  { id: "mediaContentPublisher", name: "Media / Content Publisher" },
  { id: "digitalGaming", name: "Digital Gaming" },
  { id: "gambling", name: "Gambling" },
  { id: "other", name: "Other" },
];

const inputKeys = {
  firstName: "firstName",
  lastName: "lastName",
  businessName: "businessName",
  industry: "industry",
  emailAddress: "emailAddress",
  role: "role",
  password: "password",
  confirmPassword: "confirmPassword",
};

type InputType = { [key in keyof typeof inputKeys]: string };

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<ErrorState>({
    firstName: false,
    lastName: false,
    businessName: false,
    industry: false,
    emailAddress: false,
    role: false,
    password: false,
    confirmPassword: false,
  });
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<InputType>({
    firstName: "",
    lastName: "",
    businessName: "",
    industry: "",
    emailAddress: "",
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

  if (verifyAccount) return <VerifyAccount email={input.emailAddress} />;

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
            id={inputKeys.firstName}
            leftIcon={userIcon}
            label="First Name"
            placeholder="First Name"
            value={input.firstName}
            onChange={handleChange}
            error={error}
          />
          <CustomTextInput
            id={inputKeys.lastName}
            leftIcon={userIcon}
            label="Last Name"
            placeholder="Last Name"
            value={input.lastName}
            onChange={handleChange}
            error={error}
          />
        </div>

        <CustomTextInput
          id={inputKeys.businessName}
          leftIcon={briefcaseIcon}
          label="Business Name"
          placeholder="Business Name"
          value={input.businessName}
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
          id={inputKeys.emailAddress}
          leftIcon={emailIcon}
          label="Email Address"
          placeholder="name@example.com"
          value={input.emailAddress}
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
