import { useEffect, useState } from "react";
import ToggleButton, {
  ToggleId,
  ToggleState,
} from "../../ToggleButton/ToggleButton";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./Notifications.module.css";
import Button from "@/components/CustomInput/Button/Button";

const inputKeys = {
  transactions: "transactions",
  security: "security",
  productUpdates: "productUpdates",
  marketing: "marketing",
} as const;

type InputTypes = {
  [K in keyof typeof inputKeys]: boolean;
};

const Notifications = () => {
  const [input, setInput] = useState<InputTypes>({
    transactions: false,
    security: true,
    productUpdates: true,
    marketing: true,
  });

  const handleChange = (state: ToggleState, id?: ToggleId) => {
    if (!id) return;
    setInput((i) => ({ ...i, [id]: state }));
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <div className={classes.container}>
      <SettingsHeader
        title="Email Notifications"
        description="Manage your email notifications"
      />
      <div className={classes.inputWrapper}>
        <div className={classes.toggleWrapper}>
          <div>
            <div className={classes.title}>Transaction Alerts</div>
            <div className={classes.description}>
              Receive notifications for new transactions
            </div>
          </div>
          <ToggleButton
            id={inputKeys.transactions}
            value={input.transactions}
            onChange={handleChange}
          />
        </div>
        <div className={classes.toggleWrapper}>
          <div>
            <div className={classes.title}>Security Alerts</div>
            <div className={classes.description}>
              Get notified about security events
            </div>
          </div>
          <ToggleButton
            id={inputKeys.security}
            value={input.security}
            onChange={handleChange}
          />
        </div>
        <div className={classes.toggleWrapper}>
          <div>
            <div className={classes.title}>Product Updates</div>
            <div className={classes.description}>
              Learn about new features and updates
            </div>
          </div>
          <ToggleButton
            id={inputKeys.productUpdates}
            value={input.productUpdates}
            onChange={handleChange}
          />
        </div>
        <div className={classes.toggleWrapper}>
          <div>
            <div className={classes.title}>Marketing</div>
            <div className={classes.description}>
              Receive marketing and promotional emails
            </div>
          </div>
          <ToggleButton
            id={inputKeys.marketing}
            value={input.marketing}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={classes.btnWrapper}>
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
};

export default Notifications;
