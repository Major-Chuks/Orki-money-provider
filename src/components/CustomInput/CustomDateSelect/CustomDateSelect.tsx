import classes from "./CustomDateSelect.module.css";
import { useState } from "react";
// import chevronIcon from "@/assets/icon-chevron-light.svg";

const dropdownItems = [
  {
    name: "Last month",
    label: "1M",
  },
  {
    name: "Last 3 months",
    label: "3M",
  },
  {
    name: "Last 6 months",
    label: "6M",
  },
  {
    name: "Last year",
    label: "1Y",
  },
];

const CustomDateSelect = () => {
  const [selected, setSelected] = useState({
    name: "Last month",
    label: "1M",
  });

  return (
    <div className={classes.customDropdown}>
      <div className={classes.selected}>
        {selected.name}
        {/* <Image src={chevronIcon} alt="" /> */}
        <div></div>
      </div>

      <div className={classes.dropdownWrapper}>
        <div className={classes.dropdown}>
          {dropdownItems.map(({ name, label }, index) => (
            <div
              onClick={() => setSelected({ name, label })}
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

export default CustomDateSelect;
