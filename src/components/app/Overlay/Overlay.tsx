import TourPointer from "../TourGuide/TourPointer";
import classes from "./Overlay.module.css";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.container}>
      <TourPointer id="tour_0" />
      {children}
    </div>
  );
};

export default Overlay;
