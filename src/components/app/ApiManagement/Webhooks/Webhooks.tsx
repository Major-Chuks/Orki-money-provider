import Button from "@/components/CustomInput/Button/Button";
import TextViewer from "../../TextViewer/TextViewer";
import classes from "./Webhooks.module.css";
import Transactions from "./Transactions";
import ToggleButton from "../../ToggleButton/ToggleButton";

const Webhooks = () => {
  const handleChange = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.configSection}>
        <div className={classes.header}>
          <div className={classes.title}>Webhooks</div>
          <div className={classes.description}>
            Configure webhook URLs for real-time event notifications.
          </div>
        </div>

        <TextViewer
          label="Webhook URL"
          value="https://your-domain.com/webhooks"
          note="The URL where Orki Terminal will send real-time event notifications."
        />

        <div className={classes.eventsWrapper}>
          <div className={classes.title}>Subscribed Events</div>
          <div className={classes.eventStatus}>
            <div className={classes.status}>
              <ToggleButton
                id="success"
                onChange={handleChange}
                value={false}
              />
              Payment Success
            </div>
            <div className={classes.status}>
              <ToggleButton
                id="success"
                onChange={handleChange}
                value={false}
              />
              Payment Failed
            </div>
            <div className={classes.status}>
              <ToggleButton
                id="success"
                onChange={handleChange}
                value={false}
              />
              Transaction Created
            </div>
          </div>
        </div>

        <Button>Save Webhook Settings</Button>
      </div>

      <Transactions />
    </div>
  );
};

export default Webhooks;
