/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import classes from "./PaymentMethodList.module.css";
import TickIcon from "@/assets/SvgComponents/TickIcon";
import { PaymentMethodResponse } from "@/interface/get_payment_methods";
import WidgetDrawer from "../../WidgetDrawer/WidgetDrawer";
import DrawerHeader from "../../WidgetDrawer/DrawerHeader/DrawerHeader";

const PaymentMethodList = ({
  onClose,
  paymentOptions,
  paymentMethod,
  onPaymentMethodChange,
  openList,
}: {
  onClose: () => void;
  paymentOptions: PaymentMethodResponse | null;
  paymentMethod: string;
  onPaymentMethodChange: (
    option: PaymentMethodResponse["payment_methods"][number]
  ) => void;
  openList: boolean;
}) => {
  const [selected, setSelected] = useState<
    PaymentMethodResponse["payment_methods"][number] | null
  >(null);

  useEffect(() => {
    if (selected) {
      onPaymentMethodChange(selected);
    }
  }, [selected]);

  return (
    <>
      {openList ? (
        <WidgetDrawer onClose={onClose}>
          {({ close }) => (
            <div className={classes.wrapper}>
              <DrawerHeader title="Select Payment Method" onClose={close} />

              <div className={classes.paymentMethodContainer}>
                {paymentOptions && paymentOptions.payment_methods.length ? (
                  paymentOptions.payment_methods.map((option, idx) => (
                    <div
                      onClick={() => {
                        setSelected(option);
                        close();
                      }}
                      key={idx}
                      className={`${classes.paymentMethod} ${
                        option.orki_id === paymentMethod && classes.active
                      } `}
                    >
                      <span className={classes.iconContainer}>
                        {option.logo && (
                          <img
                            width={24}
                            height={24}
                            src={option.logo}
                            alt="logo"
                          />
                        )}
                      </span>

                      <div className={classes.detailsWrapper}>
                        <div className={classes.details}>
                          <span className={classes.name}>{option.name}</span>
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
          )}
        </WidgetDrawer>
      ) : null}
    </>
  );
};
export default PaymentMethodList;
