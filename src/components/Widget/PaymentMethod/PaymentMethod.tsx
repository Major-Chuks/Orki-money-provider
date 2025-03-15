/* eslint-disable @next/next/no-img-element */
import classes from "./PaymentMethod.module.css";
import { useState } from "react";
import InstitutionIcon from "@/assets/SvgComponents/InstitutionIcon";
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
  onPaymentMethodChange: (option: PaymentMethodResponse[number]) => void;
}) => {
  const [togglePaymentMethod, setTogglePaymentMethod] = useState(false);

  const getMethodName = () => {
    return paymentOptions?.find((pm) => pm.orki_id === paymentMethod)?.name;
  };

  return (
    <div className={classes.container}>
      <PaymentMethodList
        paymentOptions={paymentOptions}
        paymentMethod={paymentMethod}
        onClose={() => setTogglePaymentMethod(false)}
        onPaymentMethodChange={onPaymentMethodChange}
        display={togglePaymentMethod}
      />
      <div className={classes.title}>Payment method</div>
      <div
        onClick={() => !loading && setTogglePaymentMethod(true)}
        className={`${classes.selectionBox} ${loading && classes.loading}`}
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
