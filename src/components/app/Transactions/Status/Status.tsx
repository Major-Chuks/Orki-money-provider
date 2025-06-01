import CustomButton from "@/components/CustomInput/CustomButton/CustomButton";
import DropdownLayout from "../../Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "../../Dropdown/DropdownWrapper/DropdownWrapper";
import classes from "./Status.module.css";
import chevronDown from "@/assets/app/cheveron-down.svg";

const Status = ({
  onChange,
  value,
}: {
  onChange: (type: string) => void;
  value: string;
}) => {
  console.log(value);

  const types = ["Status 1", "Status 2", "Status 3", "Status 4", "Status 5"];
  return (
    <DropdownLayout>
      {({ open, close, toggle }) => (
        <>
          <div className={classes.container}>
            <CustomButton
              style={{
                borderRadius: "8px",
                background: "#FEFEFE",
                border: "1px solid #E5E7EB",
                color: "#374151",
                fontSize: "14px",
                fontWeight: "500",
                padding: "12px 16px",
              }}
              rightIcon={chevronDown}
              onClick={toggle}
            >
              Status
            </CustomButton>
          </div>

          <DropdownWrapper open={open} containerStyle={{ padding: "1px" }}>
            <div className={classes.dropdown}>
              {types.map((item) => (
                <div
                  onClick={() => {
                    onChange(item);
                    close();
                  }}
                  className={classes.item}
                  key={item}
                >
                  <div>{item}</div>
                  {/* {item === value && <TickIcon />} */}
                </div>
              ))}
            </div>
          </DropdownWrapper>
        </>
      )}
    </DropdownLayout>
  );
};

export default Status;
