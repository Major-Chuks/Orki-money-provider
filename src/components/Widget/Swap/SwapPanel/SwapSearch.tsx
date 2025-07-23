/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import classes from "./SwapSearch.module.css";
import CaretIcon from "@/assets/SvgComponents/CaretIcon";
import { get_swapPairs } from "@/types/apis/swap/get_swapPairs";
import ListBuilder from "../../CryptoCurrencySearch/ListBuilder";
import WidgetDrawer from "../../WidgetDrawer/WidgetDrawer";
import DrawerHeader from "../../WidgetDrawer/DrawerHeader/DrawerHeader";

const SwapSearch = ({
  swapTokens,
  onTokenChange,
  swapToken,
  disabled,
}: {
  swapTokens: get_swapPairs | null;
  swapToken?: string;
  disabled?: boolean;
  onTokenChange: (tokenId: get_swapPairs[number]) => void;
}) => {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selected, setSelected] = useState<get_swapPairs[number] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredTokens, setFilteredCryptoCurrencies] =
    useState<get_swapPairs | null>(swapTokens);

  const handleClick = () => {
    if (disabled) return;
    if (!toggleOverlay) {
      setFilteredCryptoCurrencies(swapTokens);
      setSearchValue("");
    }
    setToggleOverlay(!toggleOverlay);
  };

  useEffect(() => {
    if (searchValue) {
      const results =
        swapTokens?.filter((c) =>
          c.id?.toLowerCase().includes(searchValue.toLowerCase())
        ) || null;
      setFilteredCryptoCurrencies(results);
    }
  }, [searchValue]);

  useEffect(() => {
    if (selected) {
      onTokenChange({ ...selected });
    }
  }, [selected]);

  return (
    <div className={`${classes.container} ${disabled && classes.disabled}`}>
      <div onClick={handleClick} className={classes.selected}>
        <div className={classes.countryFlag}>
          <span className={classes.iconContainer}></span>
          <span className={classes.name}>
            {selected?.id ||
              swapToken?.toUpperCase() ||
              "Select swap swapToken"}
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
                {filteredTokens && (
                  <ListBuilder
                    items={filteredTokens || []}
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
                          <div className={classes.nameCode}>
                            <span className={classes.name}>{c.from}</span>
                            <span className={classes.code}>{c.to}</span>
                          </div>
                        </div>
                        <span className={classes.network}>{c.id}</span>
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
export default SwapSearch;
