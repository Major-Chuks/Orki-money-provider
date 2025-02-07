/* eslint-disable @next/next/no-img-element */
import classes from "./PaymentMethod.module.css";
import { useEffect, useState } from "react";
import PaymentMethodSearch from "../PaymentMethodSearch/PaymentMethodSearch";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import payIcon from "@/assets/widget/pay.svg";
import infoIcon from "@/assets/widget/info.svg";
import Image from "next/image";
import { PaymentMethodType } from "@/services/raw";

const PaymentMethod = ({
  paymentOptions,
  onPaymentMethodChange,
}: {
  paymentOptions: PaymentMethodType[];
  onPaymentMethodChange: (option: PaymentMethodType) => void;
}) => {
  const [selected, setSelected] = useState<PaymentMethodType>(
    paymentOptions[0]
  );
  const [togglePaymentMethod, setTogglePaymentMethod] = useState(false);

  // useEffect(() => {
  //   if (selected.name === "Other Options") {
  //     setTogglePaymentMethod(true);
  //   }
  // }, [selected]);

  useEffect(() => {
    if (selected) {
      onPaymentMethodChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(paymentOptions[0]);
  }, [paymentOptions]);

  return (
    <div className={classes.container}>
      <PaymentMethodSearch
        paymentOptions={paymentOptions}
        onClose={() => setTogglePaymentMethod(false)}
        onPaymentMethodChange={setSelected}
        display={togglePaymentMethod}
      />
      <div className={classes.title}>Payment method</div>
      <div className={classes.boxWrapper}>
        <div className={`${classes.box} ${classes.active}`}>
          {selected.icon && (
            <img
              className={classes.icon}
              width={40}
              height={40}
              src={selected.icon}
              alt=""
            />
          )}
          <div className={classes.name}>{selected.name}</div>
          <div className={classes.description}>
            Gateway Fee 1.99% <Image src={infoIcon} alt="" />{" "}
          </div>
        </div>

        <div
          onClick={() => setTogglePaymentMethod(true)}
          className={`${classes.box}`}
        >
          <Image
            className={classes.icon}
            width={40}
            height={40}
            src={payIcon}
            alt=""
          />
          <div className={classes.name}>Other Options</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
