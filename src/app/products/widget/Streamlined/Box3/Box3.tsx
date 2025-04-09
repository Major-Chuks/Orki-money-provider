import classes from "./Box3.module.css";
import Logo2 from "./Logo2";
import Logo3 from "./Logo3";
import Logo5 from "./Logo5";

const Box3 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        Various <span>onramps</span> to choose from
      </div>

      <div
        className={`${classes.sectionWrapper} ${trigger && classes.trigger}`}
      >
        <div className={classes.section}>
          <LogoWrapper>Local Ramp</LogoWrapper>
          <LogoWrapper>
            <Logo2 /> Coinify
          </LogoWrapper>
          <LogoWrapper>
            <Logo3 /> Transfy
          </LogoWrapper>
        </div>
        <div className={classes.section}>
          <LogoWrapper>Binance Connect</LogoWrapper>
          <LogoWrapper>
            <Logo5 /> Alchemy Pay
          </LogoWrapper>
          <LogoWrapper>
            <Logo2 /> Coinify
          </LogoWrapper>
        </div>
      </div>
    </div>
  );
};

export default Box3;

const LogoWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.logoWrapper}>{children}</div>;
};
