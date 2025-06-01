import ChevronDown from "@/assets/app/ChevronDown";
import DropdownLayout from "../Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "../Dropdown/DropdownWrapper/DropdownWrapper";
import classes from "./Select.module.css";
import InfoIcon from "@/assets/app/InfoIcon";

const Select = ({
  label,
  additionalLabelInfo,
  options,
  onChange,
}: {
  label: string;
  additionalLabelInfo?: React.JSX.Element;
  options: string[];
  onChange: (value: string) => void;
}) => {
  return (
    <DropdownLayout>
      {({ open, close, toggle }) => (
        <>
          <div className={classes.container}>
            <div className={classes.labelWrapper}>
              <div className={classes.label}>{label}</div>
              {additionalLabelInfo ? (
                <div className={classes.additionalLabelInfo}>
                  <InfoIcon width={12} height={12} color="#4B5563" />
                  {additionalLabelInfo}
                </div>
              ) : null}
            </div>
            <div onClick={toggle} className={classes.inputWrapper}>
              <div className={classes.selected}>Test Environment</div>
              <ChevronDown cursor="pointer" />
            </div>
          </div>
          <DropdownWrapper
            open={open}
            containerStyle={{ width: "100%" }}
            position="static"
          >
            <div className={classes.dropdown}>
              {options.map((item, idx) => (
                <div
                  onClick={() => {
                    onChange(item);
                    close();
                  }}
                  key={idx}
                  className={classes.item}
                >
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </DropdownWrapper>
        </>
      )}
    </DropdownLayout>
  );
};

export default Select;
