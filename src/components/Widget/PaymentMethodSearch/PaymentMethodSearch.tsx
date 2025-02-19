/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./PaymentMethodSearch.module.css";
import Image from "next/image";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import { PaymentMethodResponse } from "@/interface/get_fiat_currencies";

const PaymentMethodSearch = ({
  onClose,
  paymentOptions,
  onPaymentMethodChange,
  display,
}: {
  onClose: () => void;
  paymentOptions: PaymentMethodResponse[];
  onPaymentMethodChange: (option: PaymentMethodResponse) => void;
  display: boolean;
}) => {
  const [selected, setSelected] = useState<PaymentMethodResponse>(
    paymentOptions[0]
  );
  const [searchValue, setSearchValue] = useState("");
  const [filteredMethods, setFilteredMethods] =
    useState<PaymentMethodResponse[]>(paymentOptions);

  useEffect(() => {
    if (searchValue) {
      const results = paymentOptions.filter((c) =>
        c.paymentMethodName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredMethods(results);
    } else {
      setFilteredMethods(paymentOptions);
    }
  }, [searchValue]);

  useEffect(() => {
    if (selected) {
      onPaymentMethodChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    setFilteredMethods(paymentOptions);
  }, [display]);

  return (
    <Overlay style={{ display: display ? "block" : "none" }} onClose={onClose}>
      <div className={classes.wrapper}>
        <div className={classes.headingSearch}>
          <div className={classes.heading}>
            Select Payment Method{" "}
            <Image onClick={onClose} src={closeIcon} alt="" />
          </div>

          <div className={classes.searchWrapper}>
            <Search
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.paymentMethodContainer}>
          {filteredMethods.length ? (
            filteredMethods.map((c, idx) => (
              <div
                onClick={() => {
                  setSelected(c);
                  onClose();
                }}
                key={idx}
                className={classes.paymentMethod}
              >
                <div>
                  <span className={classes.iconContainer}>
                    {c.paymentMethodLogo && (
                      <img
                        width={24}
                        height={24}
                        src={c.paymentMethodLogo}
                        alt=""
                      />
                    )}
                  </span>
                  <div className={classes.nameCode}>
                    <span className={classes.name}>{c.paymentMethodName}</span>
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
export default PaymentMethodSearch;
