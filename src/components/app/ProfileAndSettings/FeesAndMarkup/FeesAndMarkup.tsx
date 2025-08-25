import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./FeesAndMarkup.module.css";
import Button from "@/components/CustomInput/Button/Button";
import ToggleButton, {
  ToggleId,
  ToggleState,
} from "../../ToggleButton/ToggleButton";
import { useState } from "react";

const FeesAndMarkup = () => {
  const [provider, setProvider] = useState({
    transak: false,
    moonpay: false,
  });

  const handleChange = () => {};

  const handleToggleChange = (state: ToggleState, id?: ToggleId) => {
    if (!id) return;
    setProvider((i) => ({ ...i, [id]: state }));
  };

  const handleSave = () => {};

  return (
    <div className={classes.container}>
      <SettingsHeader
        title="Markup Configuration"
        description="Apply markup fee across all onramp providers"
      />

      <div className={classes.line}></div>

      <div className={classes.innerContainer}>
        <SettingsHeader
          title="Global Markup Configuration"
          description="Set markup fees that will be applied to all enabled providers at once. This is useful when you want to apply the same fee structure across all providers."
        />

        <div className={classes.sectionWrapper}>
          <div className={classes.section}>
            <div className={classes.inputWrapper}>
              <CustomTextInput
                id={"onramp_fee"}
                value={"Percentage (%)"}
                placeholder="Percentage (%)"
                label="Global Onramp Fee"
                onChange={handleChange}
              />
              <CustomTextInput
                id={"offramp_fee"}
                value={"Percentage (%)"}
                placeholder="Percentage (%)"
                label="Global Offramp Fee"
                onChange={handleChange}
                disabled
              />
            </div>
            <Button
              style={{ width: "100%" }}
              loading={false}
              onClick={handleSave}
              disabled
            >
              Save Changes
            </Button>
          </div>

          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              <div className={classes.title}>
                <div>Transak</div>

                <div
                  className={`${classes.tag} ${
                    !provider.transak && classes.disabled
                  }`}
                >
                  {provider.transak ? "Enabled" : "Disabled"}
                </div>
              </div>

              <ToggleButton
                id={"transak"}
                value={provider.transak}
                onChange={handleToggleChange}
              />
            </div>
            {provider.transak ? (
              <div className={classes.inputWrapper}>
                <CustomTextInput
                  id={"onramp_fee"}
                  value={"Percentage (%)"}
                  placeholder="Percentage (%)"
                  label="Onramp"
                  onChange={handleChange}
                />
                <CustomTextInput
                  id={"offramp_fee"}
                  value={"Percentage (%)"}
                  placeholder="Percentage (%)"
                  label="Offramp"
                  onChange={handleChange}
                  disabled
                />
              </div>
            ) : null}
          </div>

          <div className={classes.section}>
            <div className={classes.sectionHeader}>
              <div className={classes.title}>
                <div>Moonpay</div>

                <div
                  className={`${classes.tag} ${
                    !provider.moonpay && classes.disabled
                  }`}
                >
                  {provider.moonpay ? "Enabled" : "Disabled"}
                </div>
              </div>

              <ToggleButton
                id={"moonpay"}
                value={provider.moonpay}
                onChange={handleToggleChange}
              />
            </div>
            {provider.moonpay ? (
              <div className={classes.inputWrapper}>
                <CustomTextInput
                  id={"onramp_fee"}
                  value={"Percentage (%)"}
                  placeholder="Percentage (%)"
                  label="Onramp"
                  onChange={handleChange}
                />
                <CustomTextInput
                  id={"offramp_fee"}
                  value={"Percentage (%)"}
                  placeholder="Percentage (%)"
                  label="Offramp"
                  onChange={handleChange}
                  disabled
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className={classes.btnWrapper}>
          <Button loading={false} onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeesAndMarkup;
