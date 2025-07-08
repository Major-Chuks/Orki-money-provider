/* eslint-disable @next/next/no-img-element */
import ModalLayout from "@/components/Modal/ModalLayout";
import classes from "./AuthenticatorModal.module.css";
import ModalContent from "@/components/Modal/ModalContent";
import Button from "@/components/CustomInput/Button/Button";
import KeyViewer from "../../KeyViewer/KeyViewer";

const AuthenticatorModal = ({
  onClose,
  onContinue,
  data,
}: {
  onClose: () => void;
  onContinue: () => void;
  data: {
    enable_2fa: boolean;
    google2fa_secret: string;
    qr_code_url: string;
  };
}) => {
  return (
    <ModalLayout>
      <ModalContent
        title="Set Up Two-Factor Authentication"
        subtitle="Secure your account with time-based one-time passwords (OTP)"
        onClose={onClose}
        stickyHeader
      >
        <div className={classes.container}>
          <div className={classes.box}>
            <div className={classes.label}>
              Scan with your authenticator app
            </div>
            <div className={classes.qrcode}>
              <img src={data.qr_code_url} alt="" />
            </div>
            <KeyViewer value={data.google2fa_secret} toggleVisibility={false} />
            <div className={classes.note}>
              If you can&apos;t scan the QR code, you can manually enter the
              secret key in your app
            </div>
          </div>
          <div className={classes.instructions}>
            <div className={classes.title}>Setup Instructions:</div>
            <ol>
              <li>
                Download an authenticator app like Google Authenticator or Auth
              </li>
              <li> Scan the QR code or enter the secret key manually</li>
              <li>
                Once added, your app will generate 6-digit codes every 30
                seconds
              </li>
            </ol>
          </div>

          <div className={classes.btnWrapper}>
            <Button variant="outlined" type="neutral" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onContinue}>Continue</Button>
          </div>
        </div>
      </ModalContent>
    </ModalLayout>
  );
};

export default AuthenticatorModal;
