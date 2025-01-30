import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./FiatCurrencySearch.module.css";
import Image from "next/image";
import arrowIcon from "@/assets/widget/arrow-down.svg";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import rightArrowIcon from "@/assets/widget/arrow-right.svg";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import SvgIcon from "../SvgIcon/SvgIcon";
import backend from "@/services/apis";

const FiatCurrencySearch = ({
  fiatCurrencies,
  onCurrencyChange,
}: {
  fiatCurrencies: get_fiat_currencies;
  onCurrencyChange: (symbol: string) => void;
}) => {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selected, setSelected] = useState<get_fiat_currencies[number] | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<get_fiat_currencies>(fiatCurrencies);

  const handleClick = () => {
    setToggleOverlay(!toggleOverlay);
  };

  const handleDefaultSelect = async () => {
    const response = await backend().get_user_country();
    let countryCode = "US";

    if (response) {
      countryCode = response.data.country;
    }

    setFilteredCurrencies(fiatCurrencies);

    const defaultCountry = fiatCurrencies.find((f) =>
      f.supportingCountries.includes(countryCode)
    );

    if (defaultCountry) {
      setSelected(defaultCountry);
    } else {
      setSelected(
        fiatCurrencies.find((f) => f.supportingCountries.includes("US")) ||
          fiatCurrencies[0]
      );
    }
  };

  useEffect(() => {
    if (!fiatCurrencies) return;
    if (searchValue) {
      const results = fiatCurrencies.filter(
        (c) =>
          c.name.toLowerCase().includes(searchValue) ||
          c.symbol.toLowerCase().includes(searchValue)
      );
      setFilteredCurrencies(results);
    }
  }, [searchValue]);

  useEffect(() => {
    if (selected) {
      onCurrencyChange(selected.symbol);
    }
  }, [selected]);

  useEffect(() => {
    handleDefaultSelect();
  }, [fiatCurrencies]);

  return (
    <div className={classes.container}>
      <div onClick={handleClick} className={classes.selected}>
        <div className={classes.countryFlag}>
          <span className={classes.iconContainer}>
            {selected && <SvgIcon svgString={selected.icon} />}
          </span>
          <span className={classes.name}>
            {selected?.symbol || "Select fiat currency"}
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
            </div>

            <div className={classes.countryWrapper}>
              {filteredCurrencies.map((c, idx) => (
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
                      <SvgIcon svgString={c.icon} />
                    </span>
                    <div className={classes.nameCode}>
                      <span className={classes.name}>{c.name}</span>
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
