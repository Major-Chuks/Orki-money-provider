/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./PaymentMethodList.module.css";
import Image from "next/image";
import closeIcon from "@/assets/widget/close.svg";
import { PaymentMethodResponse } from "@/interface/get_fiat_currencies";
import TickIcon from "@/assets/SvgComponents/TickIcon";

const PaymentMethodList = ({
  onClose,
  paymentOptions,
  paymentMethod,
  onPaymentMethodChange,
  display,
}: {
  onClose: () => void;
  paymentOptions: PaymentMethodResponse[] | null;
  paymentMethod: string;
  onPaymentMethodChange: (option: PaymentMethodResponse) => void;
  display: boolean;
}) => {
  const [selected, setSelected] = useState<PaymentMethodResponse | null>(null);

  useEffect(() => {
    if (selected) {
      onPaymentMethodChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (!paymentOptions) return;
    setSelected(paymentOptions[0]);
  }, [paymentOptions]);

  return (
    <Overlay style={{ display: display ? "block" : "none" }} onClose={onClose}>
      <div className={classes.wrapper}>
        <div className={classes.heading}>
          Select Payment Method{" "}
          <Image onClick={onClose} src={closeIcon} alt="" />
        </div>

        <div className={classes.paymentMethodContainer}>
          {paymentOptions && paymentOptions.length ? (
            paymentOptions.map((option, idx) => (
              <div
                onClick={() => {
                  setSelected(option);
                  onClose();
                }}
                key={idx}
                className={`${classes.paymentMethod} ${
                  option.paymentMethodId === paymentMethod && classes.active
                } `}
              >
                <span className={classes.iconContainer}>
                  {option.paymentMethodLogo && (
                    <img
                      width={24}
                      height={24}
                      src={option.paymentMethodLogo}
                      alt=""
                    />
                  )}
                </span>

                <div className={classes.detailsWrapper}>
                  <div className={classes.details}>
                    <span className={classes.name}>
                      {option.paymentMethodName}
                    </span>
                    {/* <span className={classes.description}></span> */}
                  </div>

                  <div className={classes.fee_icon}>
                    <span className={classes.fee}>Fee: 0.0%</span>
                    <span className={classes.tickIcon}>
                      <TickIcon />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={classes.emptyState}>
              No payment method available
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
};
export default PaymentMethodList;
