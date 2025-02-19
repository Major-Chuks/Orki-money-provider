import { useEffect, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./CountrySearch.module.css";
import Image from "next/image";
import arrowIcon from "@/assets/widget/arrow-down.svg";
import closeIcon from "@/assets/widget/close.svg";
import Search from "../Search/Search";
import { COUNTRY_DATA, ICountryData } from "@/constants/country";
import tickIcon from "@/assets/widget/tick.svg";

const CountrySearch = ({
  onCountryChange,
  overlayOnly,
  onClick,
  onClose,
}: {
  onCountryChange: (country: ICountryData) => void;
  overlayOnly?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}) => {
  const [toggleOverlay, setToggleOverlay] = useState(overlayOnly);
  const [selected, setSelected] = useState<ICountryData>(COUNTRY_DATA[101]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountry, setFilteredCountry] =
    useState<ICountryData[]>(COUNTRY_DATA);

  const handleClick = () => {
    setToggleOverlay(!toggleOverlay);
    if (onClick) {
      onClick();
    }
  };

  const handleClose = () => {
    setToggleOverlay(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (searchValue) {
      const results = COUNTRY_DATA.filter((c) =>
        c.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCountry(results);
    } else {
      setFilteredCountry(COUNTRY_DATA);
    }
  }, [searchValue]);

  return (
    <div className={classes.container}>
      {!overlayOnly && (
        <div onClick={handleClick} className={classes.selected}>
          <div className={classes.countryFlag}>
            <span className={classes.iconContainer}>
              {selected && (
                <Image width={24} height={24} src={selected?.flag} alt="" />
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
      )}
      {toggleOverlay && (
        <Overlay onClose={handleClose}>
          <div className={classes.wrapper}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>
                Select Country{" "}
                <Image onClick={handleClose} src={closeIcon} alt="" />
              </div>

              <div className={classes.searchWrapper}>
                <Search
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <div className={classes.countryWrapper}>
              {filteredCountry.map((c, idx) => (
                <div
                  onClick={() => {
                    setSelected(c);
                    onCountryChange(c);
                    handleClose();
                  }}
                  key={idx}
                  className={classes.country}
                >
                  <div className={classes.countryFlag}>
                    <span className={classes.iconContainer}>
                      <Image width={24} height={24} src={c.flag} alt="" />
                    </span>
                    <div className={classes.nameCode}>
                      <span className={classes.name}>{c.name}</span>
                      <span className={classes.code}>{c.code}</span>
                    </div>
                  </div>
                  <Image
                    className={`${classes.tickIcon} ${
                      selected?.code === c.code && classes.active
                    }`}
                    src={tickIcon}
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
export default CountrySearch;
