import CustomOTPInput from "@/components/CustomInput/CustomOTPInput/CustomOTPInput";
import classes from "./Verify2faModal.module.css";
import { useState } from "react";
import ModalLayout from "@/components/Modal/ModalLayout";
import ModalContent from "@/components/Modal/ModalContent";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import Button from "@/components/CustomInput/Button/Button";

const Verify2faModal = ({
  onClose,
  disable2fa,
}: {
  onClose: () => void;
  disable2fa: boolean;
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleVerify2fa = async () => {
    setLoading(true);
    const response = disable2fa
      ? await backend().patch_disable2fa({ otp: code })
      : await backend().patch_confirm2fa({ otp: code });
    if (response) {
      showToast(
        `Two-Factor Authentication ${
          disable2fa ? "disabled" : "enabled"
        } successfully`
      );
      onClose();
    }
    setLoading(false);
  };

  return (
    <ModalLayout>
      <ModalContent
        title="Verify Your Code"
        subtitle="Enter the 6-digit code from your authenticator app"
        onClose={onClose}
      >
        <div className={classes.container}>
          <div className={classes.box}>
            <div className={classes.title}>
              Enter the 6-digit verification code from your authenticator app
            </div>
            <CustomOTPInput
              style={{ marginBottom: "24px", marginTop: "32px" }}
              onChange={(code) => setCode(code)}
              error={false} // handle notification
            />
          </div>

          <div className={classes.btnWrapper}>
            <Button variant="outlined" type="neutral" onClick={onClose}>
              Cancel
            </Button>
            <Button loading={loading} onClick={handleVerify2fa}>
              Verify
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default Verify2faModal;
