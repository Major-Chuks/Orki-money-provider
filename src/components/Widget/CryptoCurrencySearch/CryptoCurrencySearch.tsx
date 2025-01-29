import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./CryptoCurrencySearch.module.css";
import Image from "next/image";
import arrowIcon from "@/assets/widget/arrow-down.svg";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import tickIcon from "@/assets/widget/tick.svg";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";

const CryptoCurrencySearch = ({
  cryptoCurrencies,
  onCurrencyChange,
}: {
  cryptoCurrencies: get_crypto_currencies;
  onCurrencyChange: (currency: get_crypto_currencies[number]) => void;
}) => {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selected, setSelected] = useState<
    get_crypto_currencies[number] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCryptoCurrencies, setFilteredCryptoCurrencies] =
    useState<get_crypto_currencies>(cryptoCurrencies);

  const handleClick = () => {
    setToggleOverlay(!toggleOverlay);
  };

  useEffect(() => {
    if (searchValue) {
      const results = cryptoCurrencies.filter(
        (c) =>
          c.name.toLowerCase().includes(searchValue) ||
          c.symbol.toLowerCase().includes(searchValue)
      );
      setFilteredCryptoCurrencies(results);
    }
  }, [searchValue]);

  useEffect(() => {
    if (selected) {
      onCurrencyChange({ ...selected });
    }
  }, [selected]);

  return (
    <div className={classes.container}>
      <div onClick={handleClick} className={classes.selected}>
        <div className={classes.countryFlag}>
          <span className={classes.iconContainer}>
            {selected && (
              <Image
                width={24}
                height={24}
                src={selected?.image.small}
                alt=""
              />
            )}
          </span>
          <span className={classes.name}>
            {selected?.name || "Select crypto currency"}
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
              {filteredCryptoCurrencies.map((c, idx) => (
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
                      <Image
                        width={24}
                        height={24}
                        src={c.image.small}
                        alt=""
                      />
                    </span>
                    <div className={classes.nameCode}>
                      <span className={classes.name}>{c.name}</span>
                      <span className={classes.code}>{c.symbol}</span>
                    </div>
                  </div>
                  <span className={classes.network}>{c.network.name}</span>
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
