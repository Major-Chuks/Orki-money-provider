import CloseButton from "@/components/Modal/CloseButton/CloseButton";
import classes from "./ModalContent.module.css";
import ModalWrapper from "./ModalWrapper";

interface ModalContentProps {
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  onClose: () => void;
  children: React.ReactNode;
  titleStyle?: React.CSSProperties;
  stickyHeader?: boolean;
}

const ModalContent: React.FC<ModalContentProps> = ({
  title,
  subtitle,
  size,
  onClose,
  children,
  titleStyle,
  stickyHeader,
}) => {
  return (
    <ModalWrapper size={size}>
      <div className={classes.container}>
        <div className={`${classes.header} ${stickyHeader && classes.sticky} `}>
          <div>
            {title && (
              <div style={{ ...titleStyle }} className={classes.title}>
                {title}
              </div>
            )}
            {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
          </div>
          <CloseButton onClose={onClose} />
        </div>
        {subtitle && <hr />}
        <div className={classes.body}>{children}</div>
      </div>
    </ModalWrapper>
  );
};

export default ModalContent;
