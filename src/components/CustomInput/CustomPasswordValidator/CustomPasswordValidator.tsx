import { validatePassword, validatePasswordV2 } from "@/services/utils";
import classes from "./CustomPasswordValidator.module.css";
import React from "react";

const CustomPasswordValidator = React.memo(
  ({ password }: { password: string }) => {
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
