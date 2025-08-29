import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./FeesAndMarkup.module.css";
import Button from "@/components/CustomInput/Button/Button";
import ToggleButton, {
  ToggleId,
  ToggleState,
} from "../../ToggleButton/ToggleButton";
import { useEffect, useState } from "react";
import {
  useGlobalarkupSettingsQuery,
  useGlobalMarkupSettingsMutation,
  useLocalMarkupSettingsMutation,
  useLocalMarkupSettingsQuery,
} from "@/services/queryApis";
import { get_localMarkupSettings } from "@/types/apis/markup/get_localMarkupSettings";
import { get_globalarkupSettings } from "@/types/apis/markup/get_globalarkupSettings";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import { formatText } from "@/services/utils";
import { useToast } from "@/context/Toast/ToastContext";

const FeesAndMarkup = () => {
  const [globalMarkup, setGlobalMarkup] = useState({ onramp: "", offramp: "" });
  const [localMarkup, setLocalMarkup] = useState<
    Record<string, get_localMarkupSettings>
  >({});
  const [globalErrors, setGlobalErrors] = useState({
    onramp: false,
    offramp: false,
  });
  const [localErrors, setLocalErrors] = useState<
    Record<string, { onramp: boolean; offramp: boolean }>
  >({});

  const { showToast } = useToast();

  const { data: globalMarkupRes, isPending: isGlobalMarkupPending } =
    useGlobalarkupSettingsQuery();
  const globalMarkupData = globalMarkupRes?.data
    .data as get_globalarkupSettings;

  const { data: localMarkupRes, isPending: isLocalMarkupPending } =
    useLocalMarkupSettingsQuery();
  const localMarkupData = localMarkupRes?.data
    .data as get_localMarkupSettings[];

  const { mutate: mutateGlobal, isPending: isMutateGlobalPending } =
    useGlobalMarkupSettingsMutation();

  const { mutate: mutateLocal, isPending: isMutateLocalPending } =
    useLocalMarkupSettingsMutation();

  const validateValue = (val: string): boolean => {
    const num = Number(val);
    return !isNaN(num) && num >= 0 && num <= 100;
  };

  const handleChangeGlobal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (isNaN(Number(value))) return;

    setGlobalMarkup((prev) => ({
      ...prev,
      [id]: value,
    }));
    setGlobalErrors((prev) => ({
      ...prev,
      [id]: !validateValue(value),
    }));
  };

  const handleChangeLocal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const [type, rampId] = id.split("_");

    if (isNaN(Number(value))) return;

    setLocalMarkup((prev) => ({
      ...prev,
      [rampId]: {
        ...prev[rampId],
        [`${type}_markup`]: value,
      },
    }));

    setLocalErrors((prev) => ({
      ...prev,
      [rampId]: {
        ...(prev[rampId] || { onramp: false, offramp: false }),
        [type]: !validateValue(value),
      },
    }));
  };

  const handleToggleChange = (state: ToggleState, id?: ToggleId) => {
    if (!id) return;
    const rampId = (id as string).split("_")[1];

    setLocalMarkup((prev) => ({
      ...prev,
      [rampId]: {
        ...prev[rampId],
        is_active: state,
      },
    }));
  };

  const handleSaveGlobal = () => {
    mutateGlobal(
      {
        global_offramp: Number(globalMarkup.offramp),
        global_onramp: Number(globalMarkup.onramp),
      },
      {
        onSuccess: (data) => {
          if (data) {
            showToast("Global markup updated successfully", "success");
          }
        },
        onError: () => {
          showToast("Failed to update global markup.", "error");
        },
      }
    );
  };

  const handleSaveLocal = () => {
    mutateLocal(
      Object.values(localMarkup).map((lmd) => ({
        ramp_id: lmd.ramp_id,
        ramp_name: lmd.ramp_name,
        status: lmd.is_active,
        offramp_markup: Number(lmd.offramp_markup),
        onramp_markup: Number(lmd.onramp_markup),
      })),
      {
        onSuccess: (data) => {
          if (data) {
            showToast("Markup updated successfully", "success");
          }
        },
        onError: () => {
          showToast("Failed to update markup.", "error");
        },
      }
    );
  };

  useEffect(() => {
    if (localMarkupData) {
      const lmds = {} as Record<string, get_localMarkupSettings>;
      const errs: typeof localErrors = {};
      localMarkupData.forEach((lmd) => {
        lmds[lmd.ramp_id] = lmd;
        errs[lmd.ramp_id] = { onramp: false, offramp: false };
      });
      setLocalMarkup(lmds);
      setLocalErrors(errs);
    }

    if (globalMarkupData) {
      setGlobalMarkup({
        onramp: String(globalMarkupData.global_onramp),
        offramp: String(globalMarkupData.global_offramp),
      });
      setGlobalErrors({ onramp: false, offramp: false });
    }
  }, [localMarkupData, globalMarkupData]);

  // ✅ derive disabled states
  const globalDisabled =
    globalErrors.onramp ||
    globalErrors.offramp ||
    globalMarkup.onramp === "" ||
    globalMarkup.offramp === "";

  const localDisabled = Object.values(localErrors).some(
    (err) => err.onramp || err.offramp
  );

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
          {isGlobalMarkupPending ? (
            <LoadingScreen style={{ height: "20vh" }} />
          ) : !globalMarkupData ? (
            <ErrorScreen />
          ) : (
            <div className={classes.section}>
              <div className={classes.inputWrapper}>
                <CustomTextInput
                  id={"onramp"}
                  value={globalMarkup.onramp}
                  placeholder="Percentage (%)"
                  label="Global Onramp Fee"
                  onChange={handleChangeGlobal}
                  error={globalErrors.onramp}
                  errorMsg="Value must be between 0 and 100"
                />
                <CustomTextInput
                  id={"offramp"}
                  value={globalMarkup.offramp}
                  placeholder="Percentage (%)"
                  label="Global Offramp Fee"
                  onChange={handleChangeGlobal}
                  error={globalErrors.offramp}
                  errorMsg="Value must be between 0 and 100"
                />
              </div>
              <Button
                style={{ width: "100%" }}
                loading={isMutateGlobalPending}
                onClick={handleSaveGlobal}
                disabled={globalDisabled}
              >
                Save Changes
              </Button>
            </div>
          )}

          {isLocalMarkupPending ? (
            <LoadingScreen style={{ height: "40vh" }} />
          ) : !localMarkupData ? (
            <ErrorScreen />
          ) : (
            Object.entries(localMarkup).map(
              ([
                key,
                {
                  ramp_id,
                  ramp_name,
                  onramp_markup,
                  offramp_markup,
                  is_active,
                },
              ]) => (
                <div key={key} className={classes.section}>
                  <div className={classes.sectionHeader}>
                    <div className={classes.title}>
                      <div>{formatText(ramp_name)}</div>

                      <div
                        className={`${classes.tag} ${
                          !is_active && classes.disabled
                        }`}
                      >
                        {is_active ? "Enabled" : "Disabled"}
                      </div>
                    </div>

                    <ToggleButton
                      id={`toggle_${ramp_id}`}
                      value={is_active}
                      onChange={handleToggleChange}
                    />
                  </div>
                  {is_active ? (
                    <div className={classes.inputWrapper}>
                      <CustomTextInput
                        id={`onramp_${ramp_id}`}
                        value={String(onramp_markup)}
                        placeholder="Percentage (%)"
                        label="Onramp"
                        onChange={handleChangeLocal}
                        error={localErrors[ramp_id]?.onramp || false}
                        errorMsg="Value must be between 0 and 100"
                      />
                      <CustomTextInput
                        id={`offramp_${ramp_id}`}
                        value={String(offramp_markup)}
                        placeholder="Percentage (%)"
                        label="Offramp"
                        onChange={handleChangeLocal}
                        error={localErrors[ramp_id]?.offramp || false}
                        errorMsg="Value must be between 0 and 100"
                      />
                    </div>
                  ) : null}
                </div>
              )
            )
          )}
        </div>
        <div className={classes.btnWrapper}>
          <Button
            loading={isMutateLocalPending}
            onClick={handleSaveLocal}
            disabled={localDisabled}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeesAndMarkup;
