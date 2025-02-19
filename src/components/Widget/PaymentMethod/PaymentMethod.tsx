/* eslint-disable @next/next/no-img-element */
import classes from "./PaymentMethod.module.css";
import { useState } from "react";
import PaymentMethodSearch from "../PaymentMethodSearch/PaymentMethodSearch";
import { PaymentMethodResponse } from "@/interface/get_fiat_currencies";
import InstitutionIcon from "@/assets/SvgComponents/InstitutionIcon";
import ChevronDownIcon from "@/assets/SvgComponents/ChevronDownIcon";

const PaymentMethod = ({
  paymentOptions,
  onPaymentMethodChange,
  paymentMethod,
}: {
  paymentOptions: PaymentMethodResponse[] | null;
  paymentMethod: string;
  onPaymentMethodChange: (option: PaymentMethodResponse) => void;
}) => {
  const [togglePaymentMethod, setTogglePaymentMethod] = useState(false);

  const getMethodName = () => {
    return paymentOptions?.find((pm) => pm.paymentMethodId === paymentMethod)
      ?.paymentMethodName;
  };

  return (
    <div className={classes.container}>
      <PaymentMethodSearch
        paymentOptions={paymentOptions}
        onClose={() => setTogglePaymentMethod(false)}
        onPaymentMethodChange={onPaymentMethodChange}
        display={togglePaymentMethod}
      />
      <div className={classes.title}>Payment method</div>
      <div
        onClick={() => setTogglePaymentMethod(true)}
        className={classes.selectionBox}
      >
        <div>
          <InstitutionIcon />
          {getMethodName() || "Select payment method"}
        </div>
        <ChevronDownIcon />
      </div>
    </div>
  );
};

export default PaymentMethod;
