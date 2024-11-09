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
import { outSideClickHandler } from "@/services/utils";

interface ExtendedInput extends ICustomInput {
  onSelect?: (selected: ICountryData, id?: InputIdState) => void; // New onChange signature
}

const CustomCountrySelect = ({
  id,
  placeholder,
  onSelect,
  label,
  outline = true,
  plain,
  value: selectedValue,
  error,
}: ExtendedInput) => {
  const [selected, setSelected] = useState<ICountryData>(COUNTRY_DATA[101]);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [value, setValue] = useState(COUNTRY_DATA[101].name.toLowerCase());
  const [countries, setCountries] = useState(COUNTRY_DATA);

  const handleClick = (option: ICountryData) => {
    setSelected(option);
    setValue(option.name.toLowerCase());
    setToggleDropdown(false);
    onSelect && onSelect(option, id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value.toLowerCase());
    if (!toggleDropdown) {
      setToggleDropdown(true);
    }
  };

  const handleToggleDropdown = () => {
    setCountries(COUNTRY_DATA);
    setToggleDropdown(!toggleDropdown);
  };

  useEffect(() => {
    if (value) {
      let filteredResult = COUNTRY_DATA.filter((c) =>
        c.name.toLowerCase().startsWith(value)
      );
      setCountries(filteredResult);
    } else {
      setCountries(COUNTRY_DATA);
    }
  }, [value]);

  useEffect(() => {
    onSelect && onSelect(selected, id);
    outSideClickHandler({
      className: "id_country",
      setState: setToggleDropdown,
      document: window.document,
    });
  }, []);

  useEffect(() => {
    const sv = getValue({ value: selectedValue, id });
    if (selectedValue && sv) {
      let match = COUNTRY_DATA.find(
        (c) => c.name.toLowerCase() === sv.toLowerCase()
      );
      if (match) {
        setValue(match.name);
        setSelected(match);
      }
    }
  }, [selectedValue]);

  return (
    <div
      id="id_country"
      className={`${classes.container} ${
        getError({ error, id }) && classes.error
      } ${outline && classes.outline} ${innerClasses.container}`}
    >
      {label && <div className={classes.label}>{label}</div>}
      <div onClick={handleToggleDropdown} className={classes.wrapper}>
        <div
          className={`${classes.section} ${innerClasses.section} ${
            plain && innerClasses.plain
          }`}
        >
          <div className={classes.left}>
            {selected.flag ? (
              <Image width={24} height={24} src={selected.flag} alt="flag" />
            ) : (
              <div className={innerClasses.sudoFlag}>Flag</div>
            )}
          </div>
        </div>
        <input
          className={`${classes.input} ${innerClasses.input} ${
            plain && innerClasses.plain
          }`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <div
          className={`${classes.section} ${innerClasses.section} ${
            plain && innerClasses.plain
          }`}
        >
          <div className={classes.right}>
            <Image
              className={innerClasses.chevronIcon}
              src={chevronIcon}
              alt=""
            />
          </div>
        </div>
      </div>

      {toggleDropdown && (
        <div
          className={`${innerClasses.dropdownWrapper} ${
            plain && innerClasses.plain
          }`}
        >
          <div className={innerClasses.dropdown}>
            <div className={innerClasses.scrollArea}>
              {countries.map((country, index) => (
                <div
                  onClick={() => handleClick(country)}
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
        </div>
      )}
    </div>
  );
};

export default CustomCountrySelect;
