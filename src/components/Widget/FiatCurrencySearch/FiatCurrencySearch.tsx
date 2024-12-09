import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./FiatCurrencySearch.module.css";
import Image from "next/image";
import arrowIcon from "@/assets/widget/arrow-down.svg";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import rightArrowIcon from "@/assets/widget/arrow-right.svg";
import { FIAT_CURRENCY, ICURENCY } from "@/constants/fiatCurrency";

const FiatCurrencySearch = () => {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selected, setSelected] = useState<ICURENCY>(FIAT_CURRENCY[0]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountry, setFilteredCountry] =
    useState<ICURENCY[]>(FIAT_CURRENCY);

  const handleClick = () => {
    setToggleOverlay(!toggleOverlay);
  };

  useEffect(() => {
    if (searchValue) {
      const results = FIAT_CURRENCY.filter(
        (c) =>
          c.currency.toLowerCase().includes(searchValue) ||
          c.country.toLowerCase().includes(searchValue) ||
          c.symbol.toLowerCase().includes(searchValue)
      );
      setFilteredCountry(results);
    }
  }, [searchValue]);

  return (
    <div className={classes.container}>
      <div onClick={handleClick} className={classes.selected}>
        <div className={classes.countryFlag}>
          <span className={classes.iconContainer}>
            {selected && (
              <Image width={24} height={24} src={selected?.flag} alt="" />
            )}
          </span>
          <span className={classes.name}>
            {selected?.symbol || "Select currency"}
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
            <div className={classes.heading}>
              Select Fiat Currency{" "}
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

            <div className={classes.countryWrapper}>
              {filteredCountry.map((c, idx) => (
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
                      <Image width={24} height={24} src={c.flag} alt="" />
                    </span>
                    <div className={classes.nameCode}>
                      <span className={classes.name}>{c.country}</span>
                      <span className={classes.code}>{c.symbol}</span>
                    </div>
                  </div>
                  <Image
                    className={classes.rightArrowIcon}
                    src={rightArrowIcon}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
};
export default FiatCurrencySearch;
