import { useEffect, useState } from "react";
import classes from "./CountrySearch.module.css";
import Image from "next/image";
import { COUNTRY_DATA, ICountryData } from "@/constants/country";
import tickIcon from "@/assets/widget/tick.svg";
import DrawerHeader from "../WidgetDrawer/DrawerHeader/DrawerHeader";

const CountrySearch = ({
  country,
  onClose,
  onCountryChange,
}: {
  country: ICountryData | null;
  onClose: () => void;
  onCountryChange: (country: ICountryData) => void;
}) => {
  const [selected, setSelected] = useState<ICountryData | null>(country);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountry, setFilteredCountry] =
    useState<ICountryData[]>(COUNTRY_DATA);

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
      <DrawerHeader
        title="Select Country"
        onClose={onClose}
        searchValue={searchValue}
        onSearchChange={(e) => setSearchValue(e.target.value)}
      />

      <div className={classes.countryWrapper}>
        {filteredCountry.map((c, idx) => (
          <div
            onClick={() => {
              setSelected(c);
              onCountryChange(c);
              onClose();
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
  );
};
export default CountrySearch;
