import Image from "next/image";
import classes from "./WidgetHeader.module.css";
import DropdownLayout from "@/components/app/Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "@/components/app/Dropdown/DropdownWrapper/DropdownWrapper";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import MenuIcon from "@/assets/SvgComponents/MenuIcon";
import appLogo from "@/assets/widget/app-logo2.svg";
import { WidgetType } from "@/types";

const dropdownItems: WidgetType[] = ["Onramp", "Offramp", "Swap Crypto"];

const WidgetHeader = ({
  widgetType,
  onMenuClick,
  onWidgetChange,
}: {
  widgetType: WidgetType;
  onWidgetChange: (value: WidgetType) => void;
  onMenuClick: () => void;
}) => {
  return (
    <div className={classes.container}>
      <Image className={classes.logo} src={appLogo} alt="" />

      <DropdownLayout classname={classes.dropdownLayout}>
        {({ open, close, toggle }) => (
          <>
            <div className={classes.label} onClick={toggle}>
              {widgetType}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 10L12 14L16 10"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <DropdownWrapper
              open={open}
              containerStyle={{
                width: "max-content",
                borderRadius: "12px",
                overflow: "visible",
                right: "unset",
              }}
              variant="fade"
            >
              <div className={classes.dropdown}>
                {dropdownItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onWidgetChange(item);
                      close();
                    }}
                    className={classes.item}
                  >
                    <ButtonWrapper style={{ color: "#353945" }}>
                      {item}
                    </ButtonWrapper>
                  </div>
                ))}
              </div>
            </DropdownWrapper>
          </>
        )}
      </DropdownLayout>

      <ButtonWrapper onClick={onMenuClick} className={classes.menuIcon}>
        <MenuIcon />
      </ButtonWrapper>
    </div>
  );
};

export default WidgetHeader;
