import classes from "./PaymentMethod.module.css";
import visaIcon from "@/assets/widget/visa.svg";
import bankIcon from "@/assets/widget/bank.svg";
import payIcon from "@/assets/widget/pay.svg";
import infoIcon from "@/assets/widget/info.svg";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import PaymentMethodSearch from "../PaymentMethodSearch/PaymentMethodSearch";

export type PaymentMethod = {
  icon: StaticImageData;
  title: string;
  description: string;
  info: string;
};

const paymentMethods = [
  {
    icon: visaIcon,
    title: "Visa/Mastercard",
    description: "Gateway Fee 1.99%",
    info: "",
  },
  {
    icon: bankIcon,
    title: "Bank Transfer",
    description: "Gateway Fee 1.99%",
    info: "",
  },

  {
    icon: payIcon,
    title: "Other Options",
    description: "Gateway Fee 1.99%",
    info: "",
  },
];

const PaymentMethod = () => {
  const [selected, setSelected] = useState<PaymentMethod>(paymentMethods[0]);
  const [togglePaymentMethod, setTogglePaymentMethod] = useState(false);

  useEffect(() => {
    if (selected.title === "Other Options") {
      setTogglePaymentMethod(true);
    }
  }, [selected]);

  return (
    <div className={classes.container}>
      {togglePaymentMethod && (
        <PaymentMethodSearch onClose={() => setTogglePaymentMethod(false)} />
      )}
      <div className={classes.title}>Payment method</div>
      <div className={classes.boxWrapper}>
        {paymentMethods.map((method, idx) => {
          const { icon, title, description, info } = method;
          return (
            <div
              key={idx}
              onClick={() => setSelected(method)}
              className={`${classes.box} ${
                selected.title === title && classes.active
              }`}
            >
              <Image src={icon} alt="" />
              <div className={classes.title}>{title}</div>
              <div className={classes.description}>
                {description} <Image src={infoIcon} alt="" />{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
