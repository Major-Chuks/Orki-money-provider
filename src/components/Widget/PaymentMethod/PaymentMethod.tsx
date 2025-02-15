/* eslint-disable @next/next/no-img-element */
import classes from "./PaymentMethod.module.css";
import { useEffect, useState } from "react";
import PaymentMethodSearch from "../PaymentMethodSearch/PaymentMethodSearch";
import payIcon from "@/assets/widget/pay.svg";
import infoIcon from "@/assets/widget/info.svg";
import Image from "next/image";
import { PaymentMethodResponse } from "@/interface/get_fiat_currencies";

const PaymentMethod = ({
  paymentOptions,
  onPaymentMethodChange,
}: {
  paymentOptions: PaymentMethodResponse[];
  onPaymentMethodChange: (option: PaymentMethodResponse) => void;
}) => {
  const [selected, setSelected] = useState<PaymentMethodResponse>(
    paymentOptions[0]
  );

  const [togglePaymentMethod, setTogglePaymentMethod] = useState(false);
  const [modifiedOptions, setModifiedOptions] =
    useState<PaymentMethodResponse[]>();

  useEffect(() => {
    if (selected) {
      onPaymentMethodChange(selected);
      const modF = paymentOptions.filter(
        (pop) => pop.paymentMethodId !== selected.paymentMethodId
      );
      setModifiedOptions(modF);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(paymentOptions[0]);
    const modF = [...paymentOptions];
    modF.shift();
    setModifiedOptions(modF);
  }, [paymentOptions]);

  if (!selected) return null;

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
          {selected.paymentMethodLogo && (
            <img
              className={classes.icon}
              width={40}
              height={40}
              src={selected.paymentMethodLogo}
              alt=""
            />
          )}
          <div className={classes.name}>{selected.paymentMethodName}</div>
          <div className={classes.description}>
            Gateway Fee 1.99% <Image src={infoIcon} alt="" />{" "}
          </div>
        </div>

        {modifiedOptions && (
          <div
            onClick={() => setSelected(modifiedOptions[0])}
            className={`${classes.box}`}
          >
            {modifiedOptions[0].paymentMethodLogo && (
              <img
                className={classes.icon}
                width={40}
                height={40}
                src={modifiedOptions[0].paymentMethodLogo}
                alt=""
              />
            )}
            <div className={classes.name}>
              {modifiedOptions[0].paymentMethodName}
            </div>
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
