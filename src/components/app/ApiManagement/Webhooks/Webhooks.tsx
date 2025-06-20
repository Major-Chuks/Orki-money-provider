import Button from "@/components/CustomInput/Button/Button";
import classes from "./Webhooks.module.css";
import Transactions from "./Transactions";
import ToggleButton, {
  ToggleId,
  ToggleState,
} from "../../ToggleButton/ToggleButton";
import {
  useSubscribeToWebhookMutation,
  useWebhooksQuery,
} from "@/services/queryApis";
import { get_webhooks } from "@/types/apis/webhook/get_webhooks";
import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const Webhooks = () => {
  const { data, isPending, isError } = useWebhooksQuery();
  const webhook: get_webhooks = data?.data.data;

  const { mutate: subscribeWebhook, isPending: isWebhookPending } =
    useSubscribeToWebhookMutation();

  const [url, setUrl] = useState("");
  const [events, setEvents] = useState({});

  const handleEventChange = (state: ToggleState, id?: ToggleId) => {
    if (!id) return;
    setEvents((e) => ({ ...e, [id]: state }));
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("chaning...");

    const value = event.target.value;
    setUrl(value);
  };

  const handleSaveSettings = () => {
    const subEvents = Object.entries(events)
      .filter(([, value]) => value)
      .map(([key]) => key);
    console.log(subEvents);

    subscribeWebhook(
      { events: subEvents, url },
      {
        onSuccess: (response) => {
          console.log(response);
        },
      }
    );
  };

  useEffect(() => {
    if (webhook) {
      setUrl(webhook.url);
    }
  }, [webhook]);

  return (
    <div className={classes.container}>
      {isPending ? (
        <LoadingScreen />
      ) : isError ? (
        <ErrorScreen />
      ) : webhook ? (
        <div className={classes.configSection}>
          <div className={classes.header}>
            <div className={classes.title}>Webhooks</div>
            <div className={classes.description}>
              Configure webhook URLs for real-time event notifications.
            </div>
          </div>

          <div>
            <CustomTextInput
              label="Webhook URL"
              value={url}
              onChange={handleTextChange}
            />
            <div>
              <span>note</span>
              The URL where Orki Terminal will send real-time event
              notifications.
            </div>
          </div>

          <div className={classes.eventsWrapper}>
            <div className={classes.title}>Subscribed Events</div>
            <div className={classes.eventStatus}>
              <div className={classes.status}>
                <ToggleButton
                  id="PAYMENT_SUCCESS"
                  onChange={handleEventChange}
                  value={webhook.subscribed_events.includes("PAYMENT_SUCCESS")}
                />
                Payment Success
              </div>
              <div className={classes.status}>
                <ToggleButton
                  id="PAYMENT_FAIL"
                  onChange={handleEventChange}
                  value={webhook.subscribed_events.includes("PAYMENT_FAIL")}
                />
                Payment Failed
              </div>
            </div>
          </div>

          <Button loading={isWebhookPending} onClick={handleSaveSettings}>
            Save Webhook Settings
          </Button>
        </div>
      ) : null}

      <Transactions />
    </div>
  );
};

export default Webhooks;
