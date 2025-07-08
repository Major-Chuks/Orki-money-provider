import { useEffect, useState } from "react";
import ToggleButton, {
  ToggleId,
  ToggleState,
} from "../../ToggleButton/ToggleButton";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./Notifications.module.css";
import Button from "@/components/CustomInput/Button/Button";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import { useFetchNotificationEventsQuery } from "@/services/queryApis";
import { get_fetchNotificationEvents } from "@/types/apis/userProfile/get_fetchNotificationEvents";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const inputKeys = {
  transactions: "transactions",
  security: "security",
  product: "product",
  marketing: "marketing",
} as const;

type InputTypes = {
  [K in keyof typeof inputKeys]: boolean;
};

const Notifications = () => {
  const { data, isPending } = useFetchNotificationEventsQuery();
  const notifications: get_fetchNotificationEvents = data?.data.data;

  const [input, setInput] = useState<InputTypes>({
    transactions: false,
    security: false,
    product: false,
    marketing: false,
  });
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleChange = (state: ToggleState, id?: ToggleId) => {
    if (!id) return;
    setInput((i) => ({ ...i, [id]: state }));
  };

  const handleSave = async () => {
    setLoading(true);
    const response = await backend().patch_updateNotificationEvents(input);
    if (response) {
      showToast("NOtification preference updated successfully", "success");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isPending && notifications) {
      setInput({
        transactions: notifications.transactions,
        security: notifications.security,
        product: notifications.product,
        marketing: notifications.marketing,
      });
    }
  }, [isPending, notifications]);

  return (
    <div className={classes.container}>
      <SettingsHeader
        title="Email Notifications"
        description="Manage your email notifications"
      />
      {isPending ? (
        <LoadingScreen style={{ height: "40vh" }} />
      ) : (
        <>
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
                id={inputKeys.product}
                value={input.product}
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
            <Button loading={loading} onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
