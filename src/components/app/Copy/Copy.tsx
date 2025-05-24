import classes from "./Copy.module.css";
import { useState } from "react";

interface CopyProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  value: string;
}

const Copy: React.FC<CopyProps> = ({ children, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 651);
  };

  return (
    <div
      onClick={handleCopy}
      className={`${classes.container} ${copied && classes.copied}`}
    >
      <div className={classes.scrollArea}>
        <div className={classes.main}>{children}</div>
      </div>
    </div>
  );
};

export default Copy;
