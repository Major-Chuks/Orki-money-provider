/* eslint-disable react-hooks/exhaustive-deps */
import { validatePasswordV2 } from "@/services/utils";
import classes from "./CustomPasswordValidator.module.css";
import React, { useEffect } from "react";

const CustomPasswordValidator = React.memo(
  ({
    password,
    onChange,
  }: {
    password: string;
    onChange: (isValid: boolean) => void;
  }) => {
    useEffect(() => {
      const res = Object.values(validatePasswordV2(password)).every((i) => i);
      onChange(res);
    }, [password]);

    return (
      <div className={classes.container}>
        {Object.entries(validatePasswordV2(password)).map(
          ([key, value], idx) => {
            return (
              <div
                className={`${classes.tag} ${value && classes.success}`}
                key={idx}
              >
                {key}
              </div>
            );
          }
        )}
      </div>
    );
  }
);

CustomPasswordValidator.displayName = "CustomPasswordValidator";

export default CustomPasswordValidator;
