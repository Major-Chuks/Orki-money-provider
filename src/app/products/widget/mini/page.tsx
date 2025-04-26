import Widget from "@/components/Widget/Widget";
import classes from "./page.module.css";

const MiniWidget = () => {
  return (
    <div className={classes.container}>
      <Widget />
    </div>
  );
};

export default MiniWidget;
