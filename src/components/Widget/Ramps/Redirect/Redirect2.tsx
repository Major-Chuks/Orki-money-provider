import classes from "./Redirect2.module.css";
import creditCard from "@/assets/widget/credit-card.png";
import Image from "next/image";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import ExternalLink from "@/assets/SvgComponents/ExternalLink";
import CloseIcon from "@/assets/SvgComponents/CloseIcon";
import Securityicon from "@/assets/SvgComponents/SecurityIcon";
import { toSentenceCase } from "@/services/utils";
import { get_defaults } from "@/interface/get_defaults";
import Overlay from "../../Overlay/Overlay";

const Redirect2 = ({
  handleOpenProvider,
  handleCloseProvider,
  provider,
}: {
  handleOpenProvider: () => void;
  handleCloseProvider: () => void;
  provider: get_defaults[number] | null;
}) => {
  return (
    <Overlay onClose={() => {}}>
      <div className={classes.container}>
        <div className={classes.main}>
          <div className={classes.heading}>
            <div>Continue Payment</div>
            <div
              onClick={handleCloseProvider}
              className={classes.iconContainer}
            >
              <CloseIcon />
            </div>
          </div>

          <div className={classes.imageContainer}>
            <Image src={creditCard} alt="" />
          </div>

          <div className={classes.title}>
            Complete your purchase with {provider?.provider.name.toLowerCase()}{" "}
            in the new tab
          </div>

          <div className={classes.description}>
            If new tab is not opened, check setting related to tabs in your
            browser and try again by clicking the button below.
          </div>

          <CustomButton
            onClick={handleOpenProvider}
            style={{ background: "#6148C2" }}
          >
            <div className={classes.btnContent}>
              Open {toSentenceCase(provider?.provider.name)} in new tab
              <ExternalLink />
            </div>
          </CustomButton>
          <div className={classes.note}>
            <Securityicon /> Your connection is secure
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Redirect2;
