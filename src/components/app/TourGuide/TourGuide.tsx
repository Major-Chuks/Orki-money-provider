import { useEffect, useRef, useState } from "react";
import Overlay from "../Overlay/Overlay";
import classes from "./TourGuide.module.css";
import CloseIcon from "@/assets/app/CloseIcon";
import Button from "@/components/CustomInput/Button/Button";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";

const tours: {
  id: number;
  title: string;
  description: string;
  position: "top" | "right" | "bottom" | "left" | "center";
}[] = [
  {
    id: 1,
    title: "Welcome to Orki",
    description:
      "This dashboard helps you manage your overall ramp experience.",
    position: "center",
  },
  {
    id: 2,
    title: "Navigation Sidebar",
    description:
      "Use the sidebar to navigate between different areas of the platform.",
    position: "left",
  },
  {
    id: 3,
    title: "Setup Checklist",
    description:
      "You're almost there! Just a few steps left to fully activate your Orki Terminal and start and start enabling seamless on-ramp and off-ramp transactions.",
    position: "bottom",
  },
  {
    id: 4,
    title: "Notifications",
    description: "You'll receive important updates about your account here.",
    position: "right",
  },
];

const tourLength = tours.length - 1;

interface TourGuideProps {
  onClose: () => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ onClose }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);

  const currentTour = () => {
    return tours[current];
  };

  const handleTourPosition = () => {
    const t1 = document.getElementById(`tour_${current}`);

    if (t1) {
      const { top, left } = t1.getBoundingClientRect();
      if (cursorRef.current) {
        const cardWidth = cursorRef.current.clientWidth;
        const cardHeight = cursorRef.current.clientHeight;
        const position = tours[current].position;

        // cursorRef.current.style.height = cardHeight + "px"; // set new height to trigger transition

        if (position === "center") {
          cursorRef.current.style.transform = `translate3d(${
            left - cardWidth / 2
          }px, ${top - cardHeight / 2}px, 0)`;
        } else if (position === "top") {
          cursorRef.current.style.transform = `translate3d(${
            left - cardWidth / 2
          }px, ${top}px, 0)`;
        } else if (position === "right") {
          cursorRef.current.style.transform = `translate3d(${
            left - cardWidth
          }px, ${top}px, 0)`;
        } else if (position === "bottom") {
          cursorRef.current.style.transform = `translate3d(${
            left - cardWidth / 2
          }px, ${top - cardHeight}px, 0)`;
        } else if (position === "left") {
          cursorRef.current.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        }
      }
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      handleTourPosition();
    });

    if (cursorRef.current && contentRef.current) {
      // const contentHeight = contentRef.current.clientHeight;
      // const contentWidth = contentRef.current.clientWidth;
      // cursorRef.current.style.height = contentHeight + 32 + "px";
      // cursorRef.current.style.width = contentWidth + 32 + "px";
    }
  }, [current]);

  useEffect(() => {
    window.addEventListener("resize", handleTourPosition);
    return () => {
      window.removeEventListener("resize", handleTourPosition);
    };
  }, []);

  return (
    <Overlay>
      <div ref={cursorRef} className={classes.container}>
        <div ref={contentRef} className={classes.innerContainer}>
          <div className={classes.header}>
            <div className={classes.title}>{currentTour().title}</div>
            <ButtonWrapper onClick={onClose}>
              <CloseIcon />
            </ButtonWrapper>
          </div>

          <div className={classes.description}>{currentTour().description}</div>

          <div className={classes.control}>
            <div className={classes.counter}>
              Step {current + 1} of {tours.length}
            </div>

            <div className={classes.btnWrapper}>
              {current > 0 && current < tourLength && (
                <Button
                  onClick={() => setCurrent((c) => c - 1)}
                  type="neutral"
                  variant="outlined"
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={() => {
                  if (current < tourLength) {
                    setCurrent((c) => c + 1);
                  } else {
                    onClose();
                  }
                }}
              >
                {current >= tourLength ? "Done" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default TourGuide;
