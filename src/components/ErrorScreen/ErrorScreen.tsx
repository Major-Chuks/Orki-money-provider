import classes from "./ErrorScreen.module.css";

const ErrorScreen = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div style={style} className={classes.container}>
      Something went wrong!
    </div>
  );
};

export default ErrorScreen;
