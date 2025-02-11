import classes from "./Redirect2.module.css";
import Overlay from "../Overlay/Overlay";
import creditCard from "@/assets/widget/credit-card.png";
import Image from "next/image";
import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import ExternalLink from "@/assets/SvgComponents/ExternalLink";
import CloseIcon from "@/assets/SvgComponents/CloseIcon";
import Securityicon from "@/assets/SvgComponents/SecurityIcon";
import { post_pricing_quote } from "@/interface/post_pricing_quote";
import { toSentenceCase } from "@/services/utils";

const Redirect2 = ({
  handleOpenProvider,
  handleCloseProvider,
  quote,
}: {
  handleOpenProvider: () => void;
  handleCloseProvider: () => void;
  quote: post_pricing_quote | null;
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
            Complete your purchase with {quote?.provider.name.toLowerCase()} in
            the new tab
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
              Open {toSentenceCase(quote?.provider.name)} in new tab
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
