import { useRef } from "react";

const CustomFileUpload = ({
  id,
  label,
  style,
  accept,
  className,
  onChange,
}: {
  id?: string;
  label?: string;
  style?: React.CSSProperties;
  accept?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      className={className}
      style={{ ...style, display: "inline-block", position: "relative" }}
      onClick={handleClick}
    >
      {label || "File"}

      <input
        id={id}
        accept={accept}
        ref={inputRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          height: "0",
          width: "0",
        }}
        type="file"
        onChange={onChange}
      />
    </div>
  );
};

export default CustomFileUpload;
