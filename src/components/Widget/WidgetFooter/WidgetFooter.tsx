import Image from "next/image";
import appLogo from "@/assets/widget/app-logo.svg";
import classes from "./WidgetFooter.module.css";

const WidgetFooter = () => {
  return (
    <div className={classes.container}>
      <Image src={appLogo} alt="" />
      Powered by Orki
    </div>
  );
};

export default WidgetFooter;
