import CustomSelect from "@/components/CustomInput/CustomSelect/CustomSelect";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import classes from "./Appearance.module.css";
import CustomColorInput from "@/components/CustomInput/CustomColorInput/CustomColorInput";
import { useEffect, useState } from "react";
import Widget from "./Widget";

const inputKeys = {
  primaryColor: "primaryColor",
  secondaryColor: "secondaryColor",
  primaryTextColor: "primaryTextColor",
  secondaryTextColor: "secondaryTextColor",
  primaryButtonTextColor: "primaryButtonTextColor",
  containerBackground: "containerBackground",
  cardBackground: "cardBackground",
  elementBorder: "elementBorder",
  containerBorder: "containerBorder",
  fontFamily: "fontFamilty",
  borderRadius: "borderRadius",
  shadowStyle: "shadowStyle",
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
  const [input, setInput] = useState<InputTypes>({
    primaryColor: "",
    secondaryColor: "",
    primaryTextColor: "",
    secondaryTextColor: "",
    primaryButtonTextColor: "",
    containerBackground: "",
    cardBackground: "",
    elementBorder: "",
    containerBorder: "",
    fontFamily: "",
    borderRadius: "",
    shadowStyle: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleSelect = () => {};

  useEffect(() => {
    console.log(input);
  }, [input]);

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
            id={inputKeys.primaryColor}
            value={input.primaryColor}
            label="Primary Color"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.secondaryColor}
            value={input.secondaryColor}
            label="Secondary Color"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.primaryTextColor}
            value={input.primaryTextColor}
            label="Primary Text Color"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.secondaryTextColor}
            value={input.secondaryTextColor}
            label="Secondary Text Color"
            onChange={handleChange}
          />
        </div>
      </section>

      <section>
        <div className={classes.title}>Buttons</div>
        <div className={classes.inputWrapper}>
          <CustomColorInput
            id={inputKeys.primaryButtonTextColor}
            value={input.primaryButtonTextColor}
            label="Primary Button Text Color"
            onChange={handleChange}
          />
        </div>
      </section>

      <section>
        <div className={classes.title}>Layout & Containers</div>
        <div className={classes.inputWrapper}>
          <CustomColorInput
            id={inputKeys.containerBackground}
            value={input.containerBackground}
            label="Container Background"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.cardBackground}
            value={input.cardBackground}
            label="Card Background"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.elementBorder}
            value={input.elementBorder}
            label="Element Border"
            onChange={handleChange}
          />
          <CustomColorInput
            id={inputKeys.containerBorder}
            value={input.containerBorder}
            label="Container Border"
            onChange={handleChange}
          />
        </div>
      </section>

      <section>
        <div className={classes.title}>Advanced Options</div>
        <div className={classes.inputWrapper}>
          <CustomSelect
            id={inputKeys.fontFamily}
            label="Font Family"
            placeholder="-- Select --"
            options={fontOptions}
            onSelect={handleSelect}
          />
          <CustomSelect
            id={inputKeys.borderRadius}
            label="Border Radius"
            placeholder="-- Select --"
            options={borderRadiusOptions}
            onSelect={handleSelect}
          />
          <CustomSelect
            id={inputKeys.shadowStyle}
            label="Shadow Style"
            placeholder="-- Select --"
            options={shadowStyleOptions}
            onSelect={handleSelect}
          />
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
