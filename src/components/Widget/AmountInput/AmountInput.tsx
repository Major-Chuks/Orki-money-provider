import { formatMoney } from "@/services/utils";
import classes from "./AmountInput.module.css";

type AmountInputProps = {
  id: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  align?: "left" | "center";
  autoFocus?: boolean;
};

const AmountInput = ({
  id,
  value,
  placeholder,
  disabled,
  error,
  align = "left",
  autoFocus,
  onChange,
}: AmountInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (onChange) {
      const formattedValue = rawValue.replace(/,/g, "");
      if (isNaN(Number(formattedValue))) return;
      onChange({
        target: {
          id: e.target.id,
          name: e.target.name,
          value: formattedValue,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={`${classes.container} ${classes[align]}`}>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={formatMoney(value)}
        onChange={handleChange}
        className={`${classes.input} ${error && classes.error}`}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default AmountInput;
