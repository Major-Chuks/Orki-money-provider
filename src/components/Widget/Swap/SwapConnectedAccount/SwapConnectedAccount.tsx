import Image from "next/image";
import classes from "./SwapConnectedAccount.module.css";
import metamaskLogo from "@/assets/widget/metamask.svg";
import CloseIcon from "@/assets/SvgComponents/CloseIcon";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

const SwapConnectedAccount = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={classes.container}>
      <Image className={classes.logo} src={metamaskLogo} alt="" />
      <div className={classes.address}>{"0x5848d...9E393A6"}</div>
      <ButtonWrapper onClick={onClose} className={classes.closeIcon}>
        <CloseIcon />
      </ButtonWrapper>
    </div>
  );
};

export default SwapConnectedAccount;
