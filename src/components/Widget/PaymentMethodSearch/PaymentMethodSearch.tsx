import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./PaymentMethodSearch.module.css";
import Image from "next/image";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import { IPAYMENT_METHOD, PAYMENT_METHOD } from "@/constants/paymentMethod";

const PaymentMethodSearch = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState<IPAYMENT_METHOD>(
    PAYMENT_METHOD[101]
  );
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountry, setFilteredCountry] =
    useState<IPAYMENT_METHOD[]>(PAYMENT_METHOD);

  useEffect(() => {
    if (searchValue) {
      const results = PAYMENT_METHOD.filter((c) =>
        c.title.toLowerCase().includes(searchValue)
      );
      setFilteredCountry(results);
    }
  }, [searchValue]);

  return (
    <Overlay onClose={onClose}>
      <div className={classes.wrapper}>
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

        <div className={classes.countryWrapper}>
          {filteredCountry.map((c, idx) => (
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
                  <Image width={24} height={24} src={c.icon} alt="" />
                </span>
                <div className={classes.nameCode}>
                  <span className={classes.name}>{c.title}</span>
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
