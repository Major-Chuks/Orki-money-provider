import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import successIcon from "@/assets/auth/success-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes } from "@/services/routes";

const PasswordResetConfirmation = ({
  input,
  classes,
}: {
  input: Record<string, string>;
  classes: Record<string, string>;
}) => {
  const router = useRouter();

  const handleLogin = () => {
    //TODO: encrypt user email and pass it to the login route
    router.push(routes.login);
  };

  return (
    <div className={classes.main}>
      <div className={classes.inputWrapper}>
        <div className={classes.successIconContainer}>
          <Image src={successIcon} alt="" />
        </div>
        <div
          style={{ fontSize: "16px", color: "#353945", lineHeight: "24px" }}
          className={classes.description}
        >
          You have successfully reset your password, proceed to login to have
          access to the dashboard
        </div>
      </div>

      <CustomButton
        style={{
          background: "#6148C2",
          padding: "16px 8px",
          borderRadius: "12px",
        }}
        onClick={handleLogin}
      >
        Proceed to Login
      </CustomButton>
    </div>
  );
};

export default PasswordResetConfirmation;
