import classes from "./TooltipComponentWrapper.module.css";

const TooltipComponentWrapper = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div key={id} className={classes.container}>
      {children}
    </div>
  );
};

export default TooltipComponentWrapper;
