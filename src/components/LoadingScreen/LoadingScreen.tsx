import classes from "./LoadingScreen.module.css";

const LoadingScreen = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div style={style} className={classes.container}>
      Please wait...
    </div>
  );
};

export default LoadingScreen;
