import CustomSelect, {
  Option,
} from "@/components/CustomInput/CustomSelect/CustomSelect";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./Appearance.module.css";
import CustomColorInput from "@/components/CustomInput/CustomColorInput/CustomColorInput";
import { useEffect, useRef, useState } from "react";
import Widget from "./Widget";
import backend from "@/services/apis";
import { debounce } from "lodash";
import { useToast } from "@/context/Toast/ToastContext";
import { useFetchWidgetThemeQuery } from "@/services/queryApis";
import { get_fetchWidgetTheme } from "@/types/apis/userProfile/get_fetchWidgetTheme";
import { InputIdState } from "@/components/CustomInput/CustomInput.script";
import Button from "@/components/CustomInput/Button/Button";

const inputKeys = {
  brand_primary_color: "brand_primary_color",
  brand_secondary_color: "brand_secondary_color",
  text_primary_color: "text_primary_color",
  text_secondary_color: "text_secondary_color",
  button_primary_text_color: "button_primary_text_color",
  layout_container_background: "layout_container_background",
  layout_card_background: "layout_card_background",
  layout_element_border: "layout_element_border",
  layout_container_border: "layout_container_border",
  advanced_font_family: "advanced_font_family",
  advanced_border_radius: "advanced_border_radius",
  advanced_shadow_style: "advanced_shadow_style",
} as const;

type InputTypes = {
  [K in keyof typeof inputKeys]: string;
};

const fontOptions = [
  { name: "Sans Serif", id: "sans-serif" },
  { name: "Serif", id: "serif" },
  { name: "Monospace", id: "monospace" },
  { name: "Roboto", id: "'Roboto', sans-serif" },
  { name: "Open Sans", id: "'Open Sans', sans-serif" },
  { name: "Lato", id: "'Lato', sans-serif" },
];

const borderRadiusOptions = [
  { id: "0px", name: "None" },
  { id: "4px", name: "Small" },
  { id: "8px", name: "Medium" },
  { id: "16px", name: "Large" },
  { id: "50%", name: "Rounded" },
];

const shadowStyleOptions = [
  { id: "none", name: "None" },
  { id: "0px 2px 4px rgba(0, 0, 0, 0.1)", name: "Soft" },
  { id: "0px 4px 8px rgba(0, 0, 0, 0.15)", name: "Medium" },
  { id: "0px 6px 12px rgba(0, 0, 0, 0.2)", name: "Strong" },
];

const Appearance = () => {
  const { data, isPending, refetch } = useFetchWidgetThemeQuery();
  const inpuData: get_fetchWidgetTheme = data?.data.data;
  const isUserChange = useRef(false);

  const [input, setInput] = useState<InputTypes>({
    brand_primary_color: "",
    brand_secondary_color: "",
    text_primary_color: "",
    text_secondary_color: "",
    button_primary_text_color: "",
    layout_container_background: "",
    layout_card_background: "",
    layout_element_border: "",
    layout_container_border: "",
    advanced_font_family: "",
    advanced_border_radius: "",
    advanced_shadow_style: "",
  });
  const [loadingReset, setLoadingReset] = useState(false);

  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
    isUserChange.current = true;
  };

  const handleSelect = (option: Option, id?: InputIdState) => {
    if (!id) return;
    setInput((i) => ({ ...i, [id]: option.id }));
    isUserChange.current = true;
  };

  const handleReset = async () => {
    setLoadingReset(true);
    const response = await backend().patch_updateWidgetTheme({
      brand_primary_color: "",
      brand_secondary_color: "",
      text_primary_color: "",
      text_secondary_color: "",
      button_primary_text_color: "",
      layout_container_background: "",
      layout_card_background: "",
      layout_element_border: "",
      layout_container_border: "",
      advanced_font_family: "",
      advanced_border_radius: "",
      advanced_shadow_style: "",
    });
    if (response) {
      showToast("Widget theme updated successfully.", "success");
      refetch();
    }
    setLoadingReset(false);
  };

  const debouncedUpdateRef = useRef(
    debounce(async (input: InputTypes) => {
      const response = await backend().patch_updateWidgetTheme(input);
      if (response) {
        showToast("Widget theme updated successfully.", "success");
      }
    }, 1000)
  );

  useEffect(() => {
    if (!isUserChange.current) return;
    debouncedUpdateRef.current(input);
  }, [input]);

  useEffect(() => {
    if (!isPending && inpuData)
      setInput({
        brand_primary_color: inpuData.brand_primary_color || "",
        brand_secondary_color: inpuData.brand_secondary_color || "",
        text_primary_color: inpuData.text_primary_color || "",
        text_secondary_color: inpuData.text_secondary_color || "",
        button_primary_text_color: inpuData.button_primary_text_color || "",
        layout_container_background: inpuData.layout_container_background || "",
        layout_card_background: inpuData.layout_card_background || "",
        layout_element_border: inpuData.layout_element_border || "",
        layout_container_border: inpuData.layout_container_border || "",
        advanced_font_family: inpuData.advanced_font_family || "",
        advanced_border_radius: inpuData.advanced_border_radius || "",
        advanced_shadow_style: inpuData.advanced_shadow_style || "",
      });
  }, [isPending, inpuData]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <SettingsHeader
          title="Theme Settings"
          description="Customize the appearance of your platform"
        />
      </div>

      <section>
        <div className={classes.title}>Brand Colors</div>
        <div className={classes.inputWrapper}>
          <CustomColorInput
            id={inputKeys.brand_primary_color}
            value={input.brand_primary_color}
            label="Primary Color"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.brand_secondary_color}
            value={input.brand_secondary_color}
            label="Secondary Color"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.text_primary_color}
            value={input.text_primary_color}
            label="Primary Text Color"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.text_secondary_color}
            value={input.text_secondary_color}
            label="Secondary Text Color"
            onChange={handleChange}
          />
        </div>
      </section>

      <section>
        <div className={classes.title}>Buttons</div>
        <div className={classes.inputWrapper}>
          <CustomColorInput
            id={inputKeys.button_primary_text_color}
            value={input.button_primary_text_color}
            label="Primary Button Text Color"
            onChange={handleChange}
          />
        </div>
      </section>

      <section>
        <div className={classes.title}>Layout & Containers</div>
        <div className={classes.inputWrapper}>
          <CustomColorInput
            id={inputKeys.layout_container_background}
            value={input.layout_container_background}
            label="Container Background"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.layout_card_background}
            value={input.layout_card_background}
            label="Card Background"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.layout_element_border}
            value={input.layout_element_border}
            label="Element Border"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.layout_container_border}
            value={input.layout_container_border}
            label="Container Border"
            onChange={handleChange}
          />
        </div>
      </section>

      <section>
        <div className={classes.title}>Advanced Options</div>
        <div className={classes.inputWrapper}>
          <CustomSelect
            id={inputKeys.advanced_font_family}
            value={input.advanced_font_family}
            label="Font Family"
            placeholder="-- Select --"
            options={fontOptions}
            onSelect={handleSelect}
          />
          <CustomSelect
            id={inputKeys.advanced_border_radius}
            value={input.advanced_border_radius}
            label="Border Radius"
            placeholder="-- Select --"
            options={borderRadiusOptions}
            onSelect={handleSelect}
          />
          <CustomSelect
            id={inputKeys.advanced_shadow_style}
            value={input.advanced_shadow_style}
            label="Shadow Style"
            placeholder="-- Select --"
            options={shadowStyleOptions}
            onSelect={handleSelect}
          />
        </div>
      </section>

      <section>
        <div className={classes.btnWrapper}>
          <Button loading={loadingReset} onClick={handleReset}>
            Reset Appearance
          </Button>
        </div>
      </section>

      <section>
        <div className={classes.title}>Preview</div>
        <div className={classes.widgetWrapper}>
          <SettingsHeader
            title="Theme Preview"
            description="This is how your theme settings will look when applied."
          />

          <div className={classes.widget}>
            <Widget />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appearance;
