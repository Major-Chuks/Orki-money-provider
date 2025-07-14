/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import classes from "./PasswordStrength.module.css";
import { validatePassword } from "@/services/utils";

const PasswordStrength = ({
  password,
  onValidate,
}: {
  password: string;
  onValidate: (state: boolean) => void;
}) => {
  const [isDefault, setIsDefault] = useState(false);
  const [validation, setValidation] = useState<{
    minimumOfEight: boolean;
    specialChar: boolean;
    number: boolean;
    upperCase: boolean;
    lowerCase: boolean;
    validCount: number;
  }>({
    minimumOfEight: false,
    specialChar: false,
    number: false,
    upperCase: false,
    lowerCase: false,
    validCount: 0,
  });

  useEffect(() => {
    const result = validatePassword(password);
    setValidation(result);
    onValidate(result.validCount === 5);
  }, [password]);

  useEffect(() => {
    const hasValid = Object.values(validation).some((i) => i);
    if (!hasValid) {
      setIsDefault(true);
    } else {
      setIsDefault(false);
    }
  }, [validation]);

  return (
    <div className={`${classes.container} ${isDefault && classes.default}`}>
      <div className={classes.bars}>
        <div
          className={`${classes.bar} ${
            validation.validCount >= 1 && classes.valid
          }`}
        ></div>
        <div
          className={`${classes.bar} ${
            validation.validCount >= 2 && classes.valid
          }`}
        ></div>
        <div
          className={`${classes.bar} ${
            validation.validCount >= 3 && classes.valid
          }`}
        ></div>
        <div
          className={`${classes.bar} ${
            validation.validCount >= 4 && classes.valid
          }`}
        ></div>
        <div
          className={`${classes.bar} ${
            validation.validCount >= 5 && classes.valid
          }`}
        ></div>
      </div>

      <div className={classes.char}>
        <CustomCheckbox
          type="round"
          state={
            isDefault
              ? "disabled"
              : validation?.minimumOfEight
              ? "valid"
              : "invalid"
          }
          value=""
          isChecked={true}
          onChange={() => {}}
        />
        <div>Minimum of 8 characters</div>
      </div>

      <div className={classes.char}>
        <CustomCheckbox
          type="round"
          state={
            isDefault
              ? "disabled"
              : validation?.specialChar
              ? "valid"
              : "invalid"
          }
          value=""
          isChecked={true}
          onChange={() => {}}
        />
        <div>Special symbols (e.g @, #, $)</div>
      </div>

      <div className={classes.char}>
        <CustomCheckbox
          type="round"
          state={
            isDefault ? "disabled" : validation?.number ? "valid" : "invalid"
          }
          value=""
          isChecked={true}
          onChange={() => {}}
        />
        <div>A number</div>
      </div>

      <div className={classes.char}>
        <CustomCheckbox
          type="round"
          state={
            isDefault ? "disabled" : validation?.lowerCase ? "valid" : "invalid"
          }
          value=""
          isChecked={true}
          onChange={() => {}}
        />
        <div>At least one lowercase</div>
      </div>

      <div className={classes.char}>
        <CustomCheckbox
          type="round"
          state={
            isDefault ? "disabled" : validation?.upperCase ? "valid" : "invalid"
          }
          value=""
          isChecked={true}
          onChange={() => {}}
        />
        <div>At least one uppercase</div>
      </div>
    </div>
  );
};

export default PasswordStrength;
