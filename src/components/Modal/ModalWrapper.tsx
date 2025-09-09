import { useEffect, useRef, useState } from "react";
import classes from "./ModalWrapper.module.css";
import ButtonWrapper from "../CustomInput/ButtonWrapper/ButtonWrapper";

interface WidgetLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
}

const ModalWrapper: React.FC<WidgetLayoutProps> = ({
  size = "md",
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 0);
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => checkScroll();
    el.addEventListener("scroll", handleScroll);

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    resizeObserver.observe(el);

    // Initial check
    checkScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollByAmount = (amount: number) => {
    containerRef.current?.scrollBy({ top: amount, behavior: "smooth" });
  };

  return (
    <div className={`${classes.wrapper} ${classes[size]}`}>
      <div {...props} className={classes.container}>
        <div ref={containerRef} className={classes.scrollWrapper}>
          {children}
        </div>
      </div>

      <div className={classes.scrollButtons}>
        {canScrollUp && (
          <ButtonWrapper onClick={() => scrollByAmount(-100)}>
            {chevronUp}
          </ButtonWrapper>
        )}
        {(canScrollDown || canScrollUp) && (
          <ButtonWrapper onClick={() => scrollByAmount(100)}>
            {chevronDown}
          </ButtonWrapper>
        )}
      </div>
    </div>
  );
};

export default ModalWrapper;

const chevronDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="#979797"
      d="M18.53 9.53a.75.75 0 0 0 0-1.06H5.47a.75.75 0 0 0 0 1.06l6 6a.75.75 0 0 0 1.06 0z"
    />
  </svg>
);

const chevronUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="#979797"
      d="M12.53 8.47a.75.75 0 0 0-1.06 0l-6 6a.75.75 0 0 0 0 1.06h13.06a.75.75 0 0 0 0-1.06z"
    />
  </svg>
);
