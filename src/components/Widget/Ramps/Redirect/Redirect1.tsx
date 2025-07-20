/* eslint-disable @next/next/no-img-element */
import classes from "./Redirect1.module.css";
import ArrowIcon from "@/assets/SvgComponents/ArrowIcon";
import TrippleChevronIcon from "@/assets/SvgComponents/TrippleChevronIcon";
import businessLogo from "@/assets/widget/business-logo.svg";
import Image from "next/image";
import { get_defaults } from "@/interface/get_defaults";
import { WidgetType } from "../../Widget";

const Redirect1 = ({
  provider,
  widgetType,
}: {
  provider: get_defaults["quotes"][number] | null;
  widgetType: WidgetType;
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.business}>
        <div className={classes.businessLogo}>
          <Image src={businessLogo} alt="" />
        </div>
        <TrippleChevronIcon />
        <div className={classes.businessLogo}>
          {provider?.provider.icon && (
            <img src={provider?.provider.icon} alt="" />
          )}
        </div>
      </div>
      <div className={classes.provider}>
        Connecting you to {provider?.provider.name}
      </div>
      {widgetType === "Onramp" ? (
        <div className={classes.purchase}>
          <div>
            {provider?.asset?.fiat_amount} {provider?.asset?.fiat.toUpperCase()}
          </div>
          <ArrowIcon />
          <div>
            {provider?.asset?.crypto_amount}{" "}
            {provider?.asset?.crypto.toUpperCase()}
          </div>
        </div>
      ) : (
        <div className={classes.purchase}>
          <div>
            {provider?.asset?.crypto_amount}{" "}
            {provider?.asset?.crypto.toUpperCase()}
          </div>
          <ArrowIcon />
          <div>
            {provider?.asset?.fiat_amount} {provider?.asset?.fiat.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Redirect1;
