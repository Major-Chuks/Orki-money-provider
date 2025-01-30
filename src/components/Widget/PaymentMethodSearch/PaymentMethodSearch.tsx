import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./PaymentMethodSearch.module.css";
import Image from "next/image";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";

const PaymentMethodSearch = ({
  onClose,
  paymentOptions,
  onPaymentMethodChange,
  display,
}: {
  onClose: () => void;
  paymentOptions: get_fiat_currencies[number]["paymentOptions"];
  onPaymentMethodChange: (
    option: get_fiat_currencies[number]["paymentOptions"][number]
  ) => void;
  display: boolean;
}) => {
  const [selected, setSelected] = useState<
    get_fiat_currencies[number]["paymentOptions"][number]
  >(paymentOptions[0]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredMethods, setFilteredMethods] =
    useState<get_fiat_currencies[number]["paymentOptions"][number][]>(
      paymentOptions
    );

  useEffect(() => {
    if (searchValue) {
      const results = paymentOptions.filter((c) =>
        c.name.toLowerCase().includes(searchValue)
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

        <div className={classes.countryWrapper}>
          {filteredMethods.map((c, idx) => (
            <div
              onClick={() => {
                setSelected(c);
                onClose();
              }}
              key={idx}
              className={classes.country}
            >
              <div className={classes.countryFlag}>
                <span className={classes.iconContainer}>
                  <img width={24} height={24} src={c.icon} alt="" />
                </span>
                <div className={classes.nameCode}>
                  <span className={classes.name}>{c.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Overlay>
  );
};
export default PaymentMethodSearch;
