import OpenEye from "@/assets/app/OpenEye";
import classes from "./KeyViewer.module.css";
import CopyIcon from "@/assets/app/CopyIcon";
import Copy from "../Copy/Copy";
import { useState } from "react";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { EyeOffIcon } from "lucide-react";

const KeyViewer = ({
  value,
  label,
  note,
  toggleVisibility = true,
}: {
  value: string;
  label?: string;
  note?: string;
  toggleVisibility?: boolean;
}) => {
  const [show, setShow] = useState(!toggleVisibility);

  return (
    <div className={classes.wrapper}>
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.container}>
        <div
          className={`${classes.inputContainer} ${
            !toggleVisibility && classes.styleBg
          }`}
        >
          <input type={show ? "text" : "password"} readOnly value={value} />
          {toggleVisibility ? (
            <ButtonWrapper onClick={() => setShow((prevState) => !prevState)}>
              {!show ? (
                <EyeOffIcon color="#6B7280" width={24} height={24} />
              ) : (
                <OpenEye />
              )}
            </ButtonWrapper>
          ) : null}
        </div>

        <Copy value={value}>
          <div className={classes.copyIcon}>
            <CopyIcon style={{ color: "#1F2937" }} />
          </div>
        </Copy>
      </div>
      {note ? <div className={classes.note}>{note}</div> : null}
    </div>
  );
};

export default KeyViewer;
