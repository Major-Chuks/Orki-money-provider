import classes from "./WidgetLayout.module.css";

const WidgetLayout = ({
  children,
  overlay,
}: {
  children: React.ReactNode;
  overlay?: boolean;
}) => {
  return (
    <div className={`${classes.container} ${overlay && classes.overlay} `}>
      {children}
    </div>
  );
};

export default WidgetLayout;
