import Image, { StaticImageData } from "next/image";
import classes from "../CustomInput.module.css";
import innerClasses from "./CustomSelect.module.css";
import { useEffect, useState } from "react";
import { getValue, ICustomInput, InputIdState } from "../CustomInput.script";
import chevronIcon from "@/assets/icon-chevron-down.svg";
import { capitalize, outSideClickHandler } from "@/services/utils";

export type Option = {
  id: number | string;
  title: string;
  icon?: StaticImageData | string;
  [key: string]: any;
};
interface ExtendedInput extends ICustomInput {
  onSelect?: (selected: Option, id?: InputIdState) => void;
  options: Option[];
  defaultValue?: Option;
  format?: boolean;
}

const CustomSelect = ({
  label,
  placeholder,
  onSelect,
  id,
  options,
  defaultValue,
  outline = true,
  plain,
  format = true,
  value: selectedValue,
}: ExtendedInput) => {
  const [selected, setSelected] = useState<Option>(
    defaultValue || { title: "", id: "", icon: "" }
  );
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [value, setValue] = useState(
    defaultValue || { title: "", id: "", icon: "" }
  );

  const handleClick = (option: Option) => {
    setSelected(option);
    setValue(option);
    setToggleDropdown(false);
    onSelect && onSelect(option, id);
  };

  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };

  useEffect(() => {
    onSelect && onSelect(selected, id);
    outSideClickHandler({
      className: "id_select",
      setState: setToggleDropdown,
      document: window.document,
    });
  }, []);

  useEffect(() => {
    const sv = getValue({ value: selectedValue, id });

    let match = options.find((c) => c.title.toLowerCase() === sv.toLowerCase());

    if (match) {
      setValue(match);
      setSelected(match);
    } else {
      setValue({ title: "", id: "", icon: "" });
      setSelected({ title: "", id: "", icon: "" });
    }
  }, [selectedValue]);

  return (
    <div
      id="id_select"
      className={`${classes.container} ${outline && classes.outline} ${
        innerClasses.container
      }`}
    >
      {label && <div className={classes.label}>{label}</div>}
      <div onClick={handleToggleDropdown} className={classes.wrapper}>
        <div
          className={`${classes.section} ${innerClasses.section} ${
            plain && classes.innerClasses
          }`}
        >
          <div className={classes.left}>
            {value?.icon && (
              <Image width={20} height={20} src={value.icon} alt="" />
            )}
          </div>
        </div>
        <input
          className={`${classes.input} ${innerClasses.input} ${
            value?.icon && innerClasses.maxPadding
          } ${plain && innerClasses.plain}`}
          type="text"
          placeholder={placeholder}
          value={format ? capitalize(value?.title) : value?.title}
          onChange={() => {}}
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
              {options.map((option, index) => (
                <div
                  onClick={() => handleClick(option)}
                  key={index}
                  className={`${innerClasses.item} ${
                    selected.title === option.title && innerClasses.active
                  }`}
                >
                  {option.icon && (
                    <Image width={20} height={20} src={option.icon} alt="" />
                  )}
                  {format ? capitalize(option.title) : option.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
