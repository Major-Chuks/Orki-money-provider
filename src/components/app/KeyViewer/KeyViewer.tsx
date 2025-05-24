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
}: {
  value: string;
  label: string;
  note?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.label}>{label}</div>
      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <input type={show ? "text" : "password"} readOnly value={value} />
          <ButtonWrapper onClick={() => setShow((prevState) => !prevState)}>
            {show ? (
              <EyeOffIcon color="#6B7280" width={24} height={24} />
            ) : (
              <OpenEye />
            )}
          </ButtonWrapper>
        </div>

        <Copy value={value}>
          <div className={classes.copyIcon}>
            <CopyIcon />
          </div>
        </Copy>
      </div>
      {note ? <div className={classes.note}>{note}</div> : null}
    </div>
  );
};

export default KeyViewer;
