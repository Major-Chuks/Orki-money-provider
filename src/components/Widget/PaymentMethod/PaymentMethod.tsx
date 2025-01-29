/* eslint-disable @next/next/no-img-element */
import classes from "./PaymentMethod.module.css";
import { useState } from "react";
import PaymentMethodSearch from "../PaymentMethodSearch/PaymentMethodSearch";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";

const PaymentMethod = ({
  paymentOptions,
}: {
  paymentOptions: get_fiat_currencies[number]["paymentOptions"] | null;
}) => {
  const [selected, setSelected] = useState<
    get_fiat_currencies[number]["paymentOptions"][number] | null
  >(null);
  const [togglePaymentMethod, setTogglePaymentMethod] = useState(false);

  // useEffect(() => {
  //   if (selected.name === "Other Options") {
  //     setTogglePaymentMethod(true);
  //   }
  // }, [selected]);

  return (
    <div className={classes.container}>
      {togglePaymentMethod && (
        <PaymentMethodSearch onClose={() => setTogglePaymentMethod(false)} />
      )}
      <div className={classes.title}>Payment method</div>
      <div className={classes.boxWrapper}>
        {paymentOptions?.map((method, idx) => {
          const { icon, name } = method;
          return (
            <div
              key={idx}
              onClick={() => setSelected(method)}
              className={`${classes.box} ${
                selected?.name === name && classes.active
              }`}
            >
              <img
                className={classes.icon}
                width={40}
                height={40}
                src={icon}
                alt=""
              />
              <div className={classes.name}>{name}</div>
              {/* <div className={classes.description}>
                {description} <Image src={infoIcon} alt="" />{" "}
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;
