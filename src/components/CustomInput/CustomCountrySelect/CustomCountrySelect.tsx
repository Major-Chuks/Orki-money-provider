import Image from "next/image";
import classes from "../CustomInput.module.css";
import innerClasses from "./CustomCountrySelect.module.css";
import { useEffect, useState } from "react";
import { COUNTRY_DATA, ICountryData } from "@/constants/country";
import {
  getError,
  getValue,
  ICustomInput,
  InputIdState,
} from "../CustomInput.script";
import chevronIcon from "@/assets/icon-chevron-down.svg";
import DropdownWrapper from "@/components/app/Dropdown/DropdownWrapper/DropdownWrapper";
import DropdownLayout from "@/components/app/Dropdown/DropdownLayout/DropdownLayout";

interface ExtendedInput extends Omit<ICustomInput, "onChange"> {
  onSelect?: (selected: ICountryData, id?: InputIdState) => void;
  defaultValue?: ICountryData;
}

const CustomCountrySelect = ({
  id,
  placeholder = "-- Select country --",
  defaultValue,
  onSelect,
  label,
  outline = true,
  value: selectedValue,
  error,
}: ExtendedInput) => {
  const [selected, setSelected] = useState<ICountryData>(
    defaultValue ?? {
      name: "",
      code: "",
      country_code: "",
      dial_code: "",
      flag: "",
      currency: "",
      currency_name: "",
      currency_symbol: "",
    }
  );
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState(COUNTRY_DATA);

  const handleClick = (option: ICountryData) => {
    setSelected(option);
    setValue(option.name.toLowerCase());
    setToggleDropdown(false);
    if (onSelect) onSelect(option, id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value.toLowerCase());
    if (!toggleDropdown) {
      setToggleDropdown(true);
    }
  };

  useEffect(() => {
    if (value) {
      const filteredResult = COUNTRY_DATA.filter((c) =>
        c.name.toLowerCase().startsWith(value)
      );
      setCountries(filteredResult);
    } else {
      setCountries(COUNTRY_DATA);
    }
  }, [value]);

  useEffect(() => {
    const sv = getValue({ value: selectedValue, id });
    if (selectedValue && sv) {
      const match = COUNTRY_DATA.find(
        (c) => c.name.toLowerCase() === sv.toLowerCase()
      );
      if (match) {
        setValue(match.name);
        setSelected(match);
      }
    }
  }, [selectedValue]);

  return (
    <DropdownLayout>
      {({ open, toggle, close }) => (
        <div
          className={`${classes.container} ${
            getError({ error, id }) && classes.error
          } ${outline && classes.outline} ${innerClasses.container}`}
        >
          {label && <div className={classes.label}>{label}</div>}
          <div onClick={toggle} className={classes.wrapper}>
            <div className={`${classes.section} ${innerClasses.section}`}>
              <div className={classes.left}>
                {selected.flag ? (
                  <Image
                    width={24}
                    height={24}
                    src={selected.flag}
                    alt="flag"
                  />
                ) : null}
              </div>
            </div>
            <input
              key={String(open)}
              id={id}
              className={`${classes.input} ${innerClasses.input} `}
              type="text"
              placeholder={placeholder}
              value={value}
              autoFocus={open}
              onChange={handleChange}
            />
            <div className={`${classes.section} ${innerClasses.section}`}>
              <div className={classes.right}>
                <Image
                  className={innerClasses.chevronIcon}
                  src={chevronIcon}
                  alt=""
                />
              </div>
            </div>
          </div>

          <DropdownWrapper
            open={open}
            containerStyle={{ width: "100%", padding: "1px" }}
          >
            <div className={innerClasses.dropdown}>
              <div className={innerClasses.scrollArea}>
                {countries.map((country, index) => (
                  <div
                    onClick={() => {
                      handleClick(country);
                      close();
                    }}
                    key={index}
                    className={`${innerClasses.item} ${
                      selected.name === country.name && innerClasses.active
                    }`}
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            </div>
          </DropdownWrapper>
        </div>
      )}
    </DropdownLayout>
  );
};

export default CustomCountrySelect;
