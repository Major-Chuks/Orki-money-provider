import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import classes from "./DrawerHeader.module.css";
import CloseIcon from "@/assets/app/CloseIcon";
import Search from "../../Search/Search";

const DrawerHeader = ({
  title,
  description,
  searchValue,
  border,
  onSearchChange,
  onClose,
}: {
  title: string;
  description?: string;
  searchValue?: string;
  border?: boolean;
  onClose: () => void;
  onSearchChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className={`${classes.container} ${border && classes.border}`}>
      <div className={classes.titleAndClose}>
        <div>
          <div className={classes.title}>{title}</div>
          {description ? (
            <div className={classes.description}>{description}</div>
          ) : null}
        </div>
        <ButtonWrapper onClick={onClose} className={classes.close}>
          <CloseIcon />
        </ButtonWrapper>
      </div>

      {onSearchChange && (
        <>
          <div style={{ marginTop: "28px" }}></div>
          <Search value={searchValue} onChange={onSearchChange} />
        </>
      )}
    </div>
  );
};

export default DrawerHeader;
