import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./CryptoCurrencySearch.module.css";
import Image from "next/image";
import arrowIcon from "@/assets/widget/arrow-down.svg";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import tickIcon from "@/assets/widget/tick.svg";
import { CRYPTO_CURRENCY, ICRYPTO_CURRENCY } from "@/constants/cryptoCurrency";

const CryptoCurrencySearch = () => {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selected, setSelected] = useState<ICRYPTO_CURRENCY>(
    CRYPTO_CURRENCY[0]
  );
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountry, setFilteredCountry] =
    useState<ICRYPTO_CURRENCY[]>(CRYPTO_CURRENCY);

  const handleClick = () => {
    setToggleOverlay(!toggleOverlay);
  };

  useEffect(() => {
    if (searchValue) {
      const results = CRYPTO_CURRENCY.filter((c) =>
        c.name.toLowerCase().includes(searchValue)
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
              <Image width={24} height={24} src={selected?.icon} alt="" />
            )}
          </span>
          <span className={classes.name}>
            {selected?.name || "Select country"}
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
                      <Image width={24} height={24} src={c.icon} alt="" />
                    </span>
                    <div className={classes.nameCode}>
                      <span className={classes.name}>{c.name}</span>
                      <span className={classes.code}>{c.id}</span>
                    </div>
                  </div>
                  <span className={classes.network}>{c.network}</span>
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
