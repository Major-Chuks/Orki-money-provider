import classes from "./Box1.module.css";
import Logo1 from "./Logo1";
import Logo2 from "./Logo2";
import Logo3 from "./Logo3";
import Logo4 from "./Logo4";
import Logo5 from "./Logo5";
import Logo6 from "./Logo6";
import Logo7 from "./Logo7";
import Logo8 from "./Logo8";
import Logo9 from "./Logo9";

const Box1 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <span>150+</span> Payment method supported around the globe{" "}
      </div>

      <div
        className={`${classes.sectionWrapper} ${trigger && classes.trigger}`}
      >
        <div className={classes.section}>
          <LogoWrapper>
            <Logo1 />
          </LogoWrapper>
          <LogoWrapper>
            <Logo2 />
          </LogoWrapper>
          <LogoWrapper>
            <Logo3 />
          </LogoWrapper>
          <LogoWrapper>
            <Logo4 />
          </LogoWrapper>
          <LogoWrapper>
            <Logo5 />
          </LogoWrapper>
        </div>
        <div className={classes.section}>
          <LogoWrapper>
            <Logo6 />
          </LogoWrapper>
          <LogoWrapper>
            <Logo7 />
          </LogoWrapper>
          <LogoWrapper>
            <Logo8 />
          </LogoWrapper>
          <LogoWrapper>
            <Logo9 />
          </LogoWrapper>
        </div>
      </div>
    </div>
  );
};

export default Box1;

const LogoWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.logoWrapper}>{children}</div>;
};
