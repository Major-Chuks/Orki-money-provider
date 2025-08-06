import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRef, useState, ReactNode } from "react";

let globalZIndex = 1000;

interface DropdownLayoutProps {
  children: (props: {
    open: boolean;
    toggle: () => void;
    close: () => void;
  }) => ReactNode;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  classname?: string;
  style?: React.CSSProperties;
  portal?: boolean;
}

const DropdownLayout: React.FC<DropdownLayoutProps> = ({
  children,
  isOpen,
  onToggle,
  classname,
  style,
  portal,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;

  const clickRef = useRef<HTMLDivElement | null>(null);
  const [zIndex, setZIndex] = useState(1);

  const handleToggle = () => {
    const nextState = !open;
    if (isOpen === undefined) setInternalOpen(nextState);
    onToggle?.(nextState);

    if (nextState) {
      globalZIndex += 1;
      setZIndex(globalZIndex);
    }
  };

  const close = () => {
    if (isOpen === undefined) setInternalOpen(false);
    onToggle?.(false);
  };

  useOutsideClick({
    ref: clickRef,
    onOutsideClick: () => {
      if (portal) return;
      if (open) close();
    },
  });

  return (
    <div
      className={classname}
      ref={clickRef}
      style={{
        ...style,
        position: "relative",
        zIndex,
      }}
    >
      {children({ open, toggle: handleToggle, close })}
    </div>
  );
};

export default DropdownLayout;
