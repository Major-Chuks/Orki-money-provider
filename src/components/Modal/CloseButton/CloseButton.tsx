import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import classes from "./CloseButton.module.css";
import CloseIcon from "@/assets/SvgComponents/CloseIcon";

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <ButtonWrapper onClick={onClose}>
      <div className={classes.container}>
        <CloseIcon />
      </div>
    </ButtonWrapper>
  );
};

export default CloseButton;
