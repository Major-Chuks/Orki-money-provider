import classes from "./Box2.module.css";
import DollarIcon from "./DollarIcon";
import EuroIcon from "./EuroIcon";
import LiraIcon from "./LiraIcon";
import NairaIcon from "./NairaIcon";
import PoundIcon from "./PoundIcon";
import RupeeIcon from "./RupeeIcon";
import TugrikIcon from "./TugrikIcon";
import YuanIcon from "./YuanIcon";

const Box2 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        Multiple <span>Fiat-Currency</span> to choose from
      </div>

      <div
        className={`${classes.sectionWrapper} ${trigger && classes.trigger}`}
      >
        <div className={classes.section}>
          <LogoWrapper>
            <DollarIcon /> Dollar
          </LogoWrapper>
          <LogoWrapper>
            <EuroIcon /> Euro
          </LogoWrapper>
          <LogoWrapper>
            <PoundIcon /> Pound
          </LogoWrapper>
          <LogoWrapper>
            <LiraIcon /> Lira
          </LogoWrapper>
          <LogoWrapper>Dutch</LogoWrapper>
        </div>
        <div className={classes.section}>
          <LogoWrapper>
            <TugrikIcon /> Tugrik
          </LogoWrapper>
          <LogoWrapper>
            <RupeeIcon /> Rupee
          </LogoWrapper>
          <LogoWrapper>
            <NairaIcon /> Naira
          </LogoWrapper>
          <LogoWrapper>
            <YuanIcon /> Yuan
          </LogoWrapper>
        </div>
      </div>
    </div>
  );
};

export default Box2;

const LogoWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.logoWrapper}>{children}</div>;
};
