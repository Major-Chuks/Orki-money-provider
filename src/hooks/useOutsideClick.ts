import { useEffect } from "react";

type OutsideClickHandlerProps = {
  ref: React.RefObject<HTMLElement | null>;
  onOutsideClick: () => void;
};

export function useOutsideClick({
  ref,
  onOutsideClick,
}: OutsideClickHandlerProps) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onOutsideClick]);
}
