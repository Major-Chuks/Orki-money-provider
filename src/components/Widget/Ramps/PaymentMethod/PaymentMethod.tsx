/* eslint-disable @next/next/no-img-element */
import classes from "./PaymentMethod.module.css";
import { useState } from "react";
import ChevronDownIcon from "@/assets/SvgComponents/ChevronDownIcon";
import PaymentMethodList from "../PaymentMethodList/PaymentMethodList";
import { PaymentMethodResponse } from "@/interface/get_payment_methods";

const PaymentMethod = ({
  paymentOptions,
  onPaymentMethodChange,
  paymentMethod,
  loading,
}: {
  paymentOptions: PaymentMethodResponse | null;
  paymentMethod: string;
  loading: boolean;
  onPaymentMethodChange: (
    option: PaymentMethodResponse["payment_methods"][number]
  ) => void;
}) => {
  const [togglePaymentMethod, setTogglePaymentMethod] = useState(false);

  const getMethod = () => {
    return paymentOptions?.payment_methods.find(
      (pm) => pm.orki_id === paymentMethod
    );
  };

  return (
    <div className={classes.container}>
      <PaymentMethodList
        paymentOptions={paymentOptions}
        paymentMethod={paymentMethod}
        onClose={() => setTogglePaymentMethod(false)}
        onPaymentMethodChange={onPaymentMethodChange}
        openList={togglePaymentMethod}
      />
      <div className={classes.title}>Payment method</div>
      <div
        onClick={() => !loading && setTogglePaymentMethod(true)}
        className={`${classes.selectionBox} ${loading && classes.loading}`}
      >
        <div>
          <span className={classes.iconContainer}>
            {getMethod() && getMethod()?.logo && (
              <img width={24} height={24} src={getMethod()?.logo} alt="logo" />
            )}
          </span>
          {getMethod()?.name || "Select payment method"}
        </div>
        <ChevronDownIcon />
      </div>
    </div>
  );
};

export default PaymentMethod;
