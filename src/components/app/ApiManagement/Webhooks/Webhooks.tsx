import Button from "@/components/CustomInput/Button/Button";
import classes from "./Webhooks.module.css";
import Transactions from "./Transactions";
import ToggleButton, {
  ToggleId,
  ToggleState,
} from "../../ToggleButton/ToggleButton";
import {
  useSubscribeToWebhookMutation,
  useWebhookSecretMutation,
  useWebhookSecretQuery,
  useWebhooksQuery,
} from "@/services/queryApis";
import { get_webhooks } from "@/types/apis/webhook/get_webhooks";
import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import KeyViewer from "../../KeyViewer/KeyViewer";
import CreateKey from "../CreateKey/CreateKey";
import { useToast } from "@/context/Toast/ToastContext";

const Webhooks = () => {
  const { data, isPending } = useWebhooksQuery();
  const webhook: get_webhooks = data?.data.data;

  const { mutate: subscribeWebhook, isPending: isWebhookPending } =
    useSubscribeToWebhookMutation();

  const [url, setUrl] = useState("");
  const [events, setEvents] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const {
    mutate: webhookSecretMutation,
    isPending: isWebhookSecretMutationPending,
  } = useWebhookSecretMutation();

  const {
    data: webhookSecretData,
    isPending: isWebhookSecretPending,
    refetch: refetchWebhookSecret,
  } = useWebhookSecretQuery();

  const { showToast } = useToast();

  const handleEventChange = (state: ToggleState, id?: ToggleId) => {
    if (!id) return;
    setEvents((e) => ({ ...e, [id]: state }));
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setUrl(value);
  };

  const handleCreateKey = () => {
    webhookSecretMutation(
      {},
      {
        onSuccess: (data) => {
          refetchWebhookSecret();
          showToast(data?.data.msg, "success");
        },
        onError: () => {
          showToast("Failed to create webhook secret.", "error");
        },
      }
    );
  };

  const handleSaveSettings = () => {
    const subEvents = Object.entries(events)
      .filter(([, value]) => value)
      .map(([key]) => key);

    subscribeWebhook(
      { events: subEvents, url },
      {
        onSuccess: () => {},
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
      {isPending || isWebhookSecretPending ? (
        <LoadingScreen />
      ) : false ? (
        <ErrorScreen />
      ) : true ? (
        <div className={classes.section}>
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
              placeholder="https://your-domain.com/webhooks"
            />
            <div className={classes.note}>
              The URL where Orki Terminal will send real-time event
              notifications.
            </div>
          </div>

          <div className={classes.eventsWrapper}>
            <div className={classes.title}>Subscribed Events</div>
            <div className={classes.eventList}>
              <div className={classes.event}>
                <ToggleButton
                  id="PAYMENT_SUCCESS"
                  onChange={handleEventChange}
                  value={webhook?.subscribed_events?.includes(
                    "PAYMENT_SUCCESS"
                  )}
                />
                Payment Success
              </div>
              <div className={classes.event}>
                <ToggleButton
                  id="PAYMENT_FAIL"
                  onChange={handleEventChange}
                  value={webhook?.subscribed_events?.includes("PAYMENT_FAIL")}
                />
                Payment Failed
              </div>
            </div>
          </div>

          <Button
            disabled={!url || !Object.values(events).some((e) => e)}
            loading={isWebhookPending}
            onClick={handleSaveSettings}
          >
            Save Webhook Settings
          </Button>
        </div>
      ) : null}

      <div className={classes.section}>
        <div className={classes.innerSection}>
          <div className={classes.header}>
            <div className={classes.title}>Webhook Secret</div>
            <div className={classes.description}>
              Use this secret to verify webhook authenticity in your
              application.
            </div>
          </div>

          <Button
            loading={isWebhookSecretMutationPending}
            onClick={handleCreateKey}
          >
            Create New Key
          </Button>
        </div>

        <KeyViewer
          value={webhookSecretData?.data?.data?.secret}
          label="Secret Key"
          note="When you generate a new secret, the old one will be automatically invalidated."
        />
      </div>

      <Transactions />

      {openCreateModal ? (
        <CreateKey
          onClose={() => {
            setOpenCreateModal(false);
          }}
          onSubmit={() => {
            setOpenCreateModal(false);
            // refetch()
          }}
          module="webhook"
        />
      ) : null}
    </div>
  );
};

export default Webhooks;
