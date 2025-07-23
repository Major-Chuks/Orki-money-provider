import classes from "./WidgetLayout.module.css";

const WidgetLayout = ({
  children,
  overlay,
}: {
  children: React.ReactNode;
  overlay?: boolean;
}) => {
  if (overlay) {
    return (
      <div className={`${classes.container} ${overlay && classes.overlay} `}>
        {children}
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default WidgetLayout;
