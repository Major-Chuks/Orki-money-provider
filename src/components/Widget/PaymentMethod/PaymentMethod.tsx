/* eslint-disable @next/next/no-img-element */
import classes from "./PaymentMethod.module.css";
import { useEffect, useState } from "react";
import PaymentMethodSearch from "../PaymentMethodSearch/PaymentMethodSearch";
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
  const [modifiedOptions, setModifiedOptions] = useState<PaymentMethodType[]>();

  useEffect(() => {
    if (selected) {
      onPaymentMethodChange(selected);
      const modF = paymentOptions.filter((pop) => pop.id !== selected.id);
      setModifiedOptions(modF);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(paymentOptions[0]);
    const modF = [...paymentOptions];
    modF.shift();
    setModifiedOptions(modF);
  }, [paymentOptions]);

  return (
    <div className={classes.container}>
      {modifiedOptions &&
        modifiedOptions.length &&
        (() => {
          const modF = [...modifiedOptions];
          modF.shift();
          return (
            <PaymentMethodSearch
              paymentOptions={modF}
              onClose={() => setTogglePaymentMethod(false)}
              onPaymentMethodChange={setSelected}
              display={togglePaymentMethod}
            />
          );
        })()}
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

        {modifiedOptions && (
          <div
            onClick={() => setSelected(modifiedOptions[0])}
            className={`${classes.box}`}
          >
            {modifiedOptions[0].icon && (
              <img
                className={classes.icon}
                width={40}
                height={40}
                src={modifiedOptions[0].icon}
                alt=""
              />
            )}
            <div className={classes.name}>{modifiedOptions[0].name}</div>
            <div className={classes.description}>
              Gateway Fee 1.99% <Image src={infoIcon} alt="" />{" "}
            </div>
          </div>
        )}

        {modifiedOptions && modifiedOptions.length && (
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
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
