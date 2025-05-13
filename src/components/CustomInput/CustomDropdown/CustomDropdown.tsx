import classes from "./CustomDropdown.module.css";
import { useState } from "react";
// import chevronIcon from "@/assets/icon-chevron-light.svg";

type Option = {
  name: string;
  label: string;
};

interface CustomSelectProps {
  options: Option[];
  onChange?: (selected: Option) => void;
  defaultOption?: Option;
}

const CustomDropdown = ({
  options,
  defaultOption,
  onChange,
}: CustomSelectProps) => {
  const [selected, setSelected] = useState<Option>(
    defaultOption || {
      name: "",
      label: "",
    }
  );

  const handleClick = (option: Option) => {
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={classes.customDropdown}>
      <div className={classes.selected}>
        {selected.name}
        {/* <Image src={chevronIcon} alt="" /> */}
        <div></div>
      </div>

      <div className={classes.dropdownWrapper}>
        <div className={classes.dropdown}>
          {options.map(({ name, label }, index) => (
            <div
              onClick={() => handleClick({ name, label })}
              key={index}
              className={`${classes.item} ${
                selected.name === name && classes.active
              }`}
            >
              <div className={`${classes.dName} ${classes.text}`}>{name}</div>
              <div className={classes.dIndicator}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;
