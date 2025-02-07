/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./CryptoCurrencySearch.module.css";
import Image from "next/image";
import arrowIcon from "@/assets/widget/arrow-down.svg";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
// import tickIcon from "@/assets/widget/tick.svg";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";

const CryptoCurrencySearch = ({
  cryptoCurrencies,
  onCurrencyChange,
  defaultCurrencyCode,
  defaultCurrencyIcon,
}: {
  cryptoCurrencies: get_crypto_currencies[] | null;
  onCurrencyChange: (currency: get_crypto_currencies) => void;
  defaultCurrencyCode?: string;
  defaultCurrencyIcon?: string;
}) => {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selected, setSelected] = useState<get_crypto_currencies | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCryptoCurrencies, setFilteredCryptoCurrencies] = useState<
    get_crypto_currencies[] | null
  >(cryptoCurrencies);

  const handleClick = () => {
    setToggleOverlay(!toggleOverlay);
  };

  useEffect(() => {
    if (searchValue) {
      const results =
        cryptoCurrencies?.filter(
          (c) =>
            c.name.toLowerCase().includes(searchValue) ||
            c.code.toLowerCase().includes(searchValue)
        ) || null;
      setFilteredCryptoCurrencies(results);
    }
  }, [searchValue]);

  useEffect(() => {
    if (selected) {
      onCurrencyChange({ ...selected });
    }
  }, [selected]);

  useEffect(() => {
    setFilteredCryptoCurrencies(cryptoCurrencies);
    // setSelected(cryptoCurrencies[0]);
  }, [cryptoCurrencies]);

  return (
    <div className={classes.container}>
      <div onClick={handleClick} className={classes.selected}>
        <div className={classes.countryFlag}>
          <span className={classes.iconContainer}>
            {selected
              ? selected.icon && <img src={selected?.icon} alt="" />
              : defaultCurrencyIcon && <img src={defaultCurrencyIcon} alt="" />}
          </span>
          <span className={classes.name}>
            {selected?.name ||
              defaultCurrencyCode?.toUpperCase() ||
              "Select crypto currency"}
          </span>
        </div>
        <Image
          className={`${toggleOverlay && classes.arrowUp}`}
          src={arrowIcon}
          alt=""
        />
      </div>
      {toggleOverlay && (
        <Overlay onClose={() => setToggleOverlay(false)}>
          <div className={classes.wrapper}>
            <div className={classes.headingSearch}>
              <div className={classes.heading}>
                Select Cryptocurrency{" "}
                <Image
                  onClick={() => setToggleOverlay(false)}
                  src={closeIcon}
                  alt=""
                />
              </div>

              <div className={classes.searchWrapper}>
                <Search
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <div className={classes.countryWrapper}>
              {filteredCryptoCurrencies?.map((c, idx) => (
                <div
                  onClick={() => {
                    setSelected(c);
                    setToggleOverlay(false);
                  }}
                  key={idx}
                  className={classes.country}
                >
                  <div className={classes.countryFlag}>
                    <span className={classes.iconContainer}>
                      {c.icon && (
                        <img width={24} height={24} src={c.icon} alt="" />
                      )}
                    </span>
                    <div className={classes.nameCode}>
                      <span className={classes.name}>{c.name}</span>
                      <span className={classes.code}>{c.code}</span>
                    </div>
                  </div>
                  <span className={classes.network}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
};
export default CryptoCurrencySearch;
