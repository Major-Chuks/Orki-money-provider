/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import classes from "./CryptoCurrencySearch.module.css";
// import tickIcon from "@/assets/widget/tick.svg";
import { get_crypto_currencies } from "@/interface/get_crypto_currencies";
import CaretIcon from "@/assets/SvgComponents/CaretIcon";
import WidgetDrawer from "../WidgetDrawer/WidgetDrawer";
import DrawerHeader from "../WidgetDrawer/DrawerHeader/DrawerHeader";
import ListBuilder from "./ListBuilder";

const CryptoCurrencySearch = ({
  cryptoCurrencies,
  onCurrencyChange,
  cryptoCurrency,
  disabled,
}: {
  cryptoCurrencies: get_crypto_currencies | null;
  onCurrencyChange: (currency: get_crypto_currencies[number]) => void;
  cryptoCurrency?: string;
  disabled?: boolean;
}) => {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selected, setSelected] = useState<
    get_crypto_currencies[number] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCryptoCurrencies, setFilteredCryptoCurrencies] =
    useState<get_crypto_currencies | null>(cryptoCurrencies);
  const [defaultCurrencyIcon, setDefaultCurrencyIcon] = useState("");

  const handleClick = () => {
    if (disabled) return;
    if (!toggleOverlay) {
      setFilteredCryptoCurrencies(cryptoCurrencies);
      setSearchValue("");
    }
    setToggleOverlay(!toggleOverlay);
  };

  useEffect(() => {
    if (searchValue) {
      const results =
        cryptoCurrencies?.filter(
          (c) =>
            c.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
            c.code?.toLowerCase().includes(searchValue.toLowerCase())
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
    if (!cryptoCurrency) return;
    const cc = cryptoCurrencies?.find(
      (cc) => cc.code.toLowerCase() === cryptoCurrency.toLowerCase()
    );
    if (cc) {
      setDefaultCurrencyIcon(cc.crypto_icon);
    }
  }, []);

  return (
    <div className={classes.container}>
      <div onClick={handleClick} className={classes.selected}>
        <div className={classes.countryFlag}>
          <span className={classes.iconContainer}>
            {selected
              ? selected.crypto_icon && (
                  <img src={selected?.crypto_icon} alt="" />
                )
              : defaultCurrencyIcon && <img src={defaultCurrencyIcon} alt="" />}
          </span>
          <span className={classes.name}>
            {selected?.name ||
              cryptoCurrency?.toUpperCase() ||
              "Select crypto currency"}
          </span>
        </div>
        <CaretIcon style={{ marginLeft: "4px" }} />
      </div>

      {toggleOverlay && (
        <WidgetDrawer onClose={() => setToggleOverlay(false)}>
          {({ close }) => (
            <div className={classes.searchWrapper}>
              <DrawerHeader
                title="Select Cryptocurrency"
                onClose={close}
                searchValue={searchValue}
                onSearchChange={(e) => setSearchValue(e.target.value)}
              />

              <div className={classes.countryWrapper}>
                {filteredCryptoCurrencies && (
                  <ListBuilder
                    items={filteredCryptoCurrencies || []}
                    height={300}
                    estimateSize={60}
                    renderItem={(c, idx) => (
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
                            {c.crypto_icon && (
                              <img
                                width={24}
                                height={24}
                                src={c.crypto_icon}
                                alt=""
                              />
                            )}
                          </span>
                          <div className={classes.nameCode}>
                            <span className={classes.name}>{c.code}</span>
                            <span className={classes.code}>{c.name}</span>
                          </div>
                        </div>
                        <span className={classes.network}>{c.network}</span>
                      </div>
                    )}
                  />
                )}
              </div>
            </div>
          )}
        </WidgetDrawer>
      )}
    </div>
  );
};
export default CryptoCurrencySearch;
