/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import classes from "./FiatCurrencySearch.module.css";
import Image from "next/image";
import rightArrowIcon from "@/assets/widget/arrow-right.svg";
import SvgIcon from "../SvgIcon/SvgIcon";
import { get_fiat_currencies } from "@/interface/get_fiat_currencies";
import CaretIcon from "@/assets/SvgComponents/CaretIcon";
import WidgetDrawer from "../WidgetDrawer/WidgetDrawer";
import DrawerHeader from "../WidgetDrawer/DrawerHeader/DrawerHeader";

const FiatCurrencySearch = ({
  fiatCurrency,
  fiatCurrencies,
  onCurrencyChange,
}: {
  fiatCurrency: string;
  fiatCurrencies: get_fiat_currencies | null;
  onCurrencyChange: (symbol: string) => void;
}) => {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selected, setSelected] = useState<get_fiat_currencies[number] | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<get_fiat_currencies | null>(fiatCurrencies);
  const [defaultCurrencyIcon, setDefaultCurrencyIcon] = useState("");

  const handleClick = () => {
    if (!toggleOverlay) {
      setFilteredCurrencies(fiatCurrencies);
      setSearchValue("");
    }
    setToggleOverlay(!toggleOverlay);
  };

  useEffect(() => {
    if (!fiatCurrencies) return;
    if (searchValue) {
      const results = fiatCurrencies.filter(
        (c) =>
          c.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          c.code.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCurrencies(results);
    }
  }, [searchValue]);

  useEffect(() => {
    if (selected) {
      onCurrencyChange(selected.code);
    }
  }, [selected]);

  useEffect(() => {
    if (!fiatCurrency) return;
    const afc = fiatCurrencies?.find(
      (fc) => fc.code.toLowerCase() === fiatCurrency.toLowerCase()
    );
    if (afc) {
      setDefaultCurrencyIcon(afc.fiat_icon);
    }
  }, []);

  return (
    <div className={classes.container}>
      <div onClick={handleClick} className={classes.selected}>
        <div className={classes.countryFlag}>
          <span className={classes.iconContainer}>
            {selected
              ? selected.fiat_icon && <SvgIcon svgString={selected.fiat_icon} />
              : defaultCurrencyIcon && (
                  <SvgIcon svgString={defaultCurrencyIcon} />
                )}
          </span>
          <span className={classes.name}>
            {selected?.code ||
              fiatCurrency?.toUpperCase() ||
              "Select fiat currency"}
          </span>
        </div>
        <CaretIcon />
      </div>
      {toggleOverlay && (
        <WidgetDrawer onClose={() => setToggleOverlay(false)}>
          {({ close }) => (
            <div className={classes.searchWrapper}>
              <DrawerHeader
                title="Select Fiat Currency"
                onClose={close}
                searchValue={searchValue}
                onSearchChange={(e) => setSearchValue(e.target.value)}
              />

              <div className={classes.countryWrapper}>
                {filteredCurrencies?.map((c, idx) => (
                  <div
                    onClick={() => {
                      setSelected(c);
                      close();
                    }}
                    key={idx}
                    className={classes.country}
                  >
                    <div className={classes.countryFlag}>
                      <span className={classes.iconContainer}>
                        {c.fiat_icon && <SvgIcon svgString={c.fiat_icon} />}
                      </span>
                      <div className={classes.nameCode}>
                        <span className={classes.name}>{c.name}</span>
                        <span className={classes.code}>{c.code}</span>
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
          )}
        </WidgetDrawer>
      )}
    </div>
  );
};
export default FiatCurrencySearch;
