import classes from "./Redirect1.module.css";
import ArrowIcon from "@/assets/SvgComponents/ArrowIcon";
import TrippleChevronIcon from "@/assets/SvgComponents/TrippleChevronIcon";
import Overlay from "../Overlay/Overlay";
import { post_pricing_quote } from "@/interface/post_pricing_quote";
import businessLogo from "@/assets/widget/business-logo.svg";
import Image from "next/image";

const Redirect1 = ({ quote }: { quote: post_pricing_quote | null }) => {
  return (
    <Overlay onClose={() => {}}>
      <div className={classes.container}>
        <div className={classes.main}>
          <div className={classes.business}>
            <div className={classes.businessLogo}>
              <Image src={businessLogo} alt="" />
            </div>
            <TrippleChevronIcon />
            <div className={classes.businessLogo}></div>
          </div>
          <div className={classes.provider}>
            Connecting you to {quote?.provider.name}
          </div>
          <div className={classes.purchase}>
            <div>
              {quote?.quote.fiat_amount}{" "}
              {quote?.quote.fiat_currency.toUpperCase()}
            </div>
            <ArrowIcon />
            <div>
              {quote?.quote.crypto_amount}{" "}
              {quote?.quote.crypto_currency.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Redirect1;
