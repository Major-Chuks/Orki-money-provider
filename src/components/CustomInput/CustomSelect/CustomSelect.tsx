/* eslint-disable @typescript-eslint/no-explicit-any */
import Image, { StaticImageData } from "next/image";
import classes from "../CustomInput.module.css";
import innerClasses from "./CustomSelect.module.css";
import { useEffect, useState } from "react";
import { getValue, ICustomInput, InputIdState } from "../CustomInput.script";
import chevronIcon from "@/assets/icon-chevron-down.svg";
import { capitalize } from "@/services/utils";
import DropdownWrapper from "@/components/app/Dropdown/DropdownWrapper/DropdownWrapper";
import DropdownLayout from "@/components/app/Dropdown/DropdownLayout/DropdownLayout";

export type Option = {
  id: string;
  name: string;
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
  format = false,
  value: selectedValue,
}: ExtendedInput) => {
  const [selected, setSelected] = useState<Option>(
    defaultValue || { name: "", id: "", icon: "" }
  );
  const [value, setValue] = useState(
    defaultValue || { name: "", id: "", icon: "" }
  );

  const handleClick = (option: Option) => {
    setSelected(option);
    setValue(option);
    if (onSelect) onSelect(option, id);
  };

  useEffect(() => {
    const sv = getValue({ value: selectedValue, id });

    const match = options.find(
      (c) =>
        c.name.toLowerCase() === sv.toLowerCase() ||
        c.id.toLowerCase() === sv.toLowerCase()
    );

    if (match) {
      setValue(match);
      setSelected(match);
    } else {
      setValue({ name: "", id: "", icon: "" });
      setSelected({ name: "", id: "", icon: "" });
    }
  }, [selectedValue]);

  return (
    <DropdownLayout>
      {({ open, close, toggle }) => (
        <div
          className={`${classes.container} ${outline && classes.outline} ${
            innerClasses.container
          }`}
        >
          {label && <div className={classes.label}>{label}</div>}
          <div onClick={toggle} className={classes.wrapper}>
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
              value={format ? capitalize(value?.name) : value?.name}
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

          <DropdownWrapper
            open={open}
            containerStyle={{ width: "100%", padding: "1px" }}
          >
            <div className={innerClasses.dropdown}>
              <div className={innerClasses.scrollArea}>
                {options.map((option, index) => (
                  <div
                    onClick={() => {
                      handleClick(option);
                      close();
                    }}
                    key={index}
                    className={`${innerClasses.item} ${
                      selected.name === option.name && innerClasses.active
                    }`}
                  >
                    {option.icon && (
                      <Image width={20} height={20} src={option.icon} alt="" />
                    )}
                    {format ? capitalize(option.name) : option.name}
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

export default CustomSelect;
