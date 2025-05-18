import classes from "./DropdownWrapper.module.css";

interface DropdownWrapperProps {
  contentStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  openDropdown: boolean;
  children: React.ReactNode;
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({
  openDropdown,
  children,
  containerStyle,
  contentStyle,
}) => {
  return (
    <div
      className={`${classes.container} ${
        openDropdown ? classes.open : classes.close
      }`}
      style={{ ...containerStyle }}
    >
      <div style={{ ...contentStyle }} className={classes.contentWrapper}>
        {children}
      </div>
    </div>
  );
};

export default DropdownWrapper;
