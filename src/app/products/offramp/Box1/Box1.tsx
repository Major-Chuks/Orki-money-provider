import classes from "./Box1.module.css";
import CosmosIcon from "./CosmosIcon";
import DaiIcon from "./DaiIcon";
import TronIcon from "./TronIcon";
import CardanoIcon from "./CardanoIcon";
import LitecoinIcon from "./LitecoinIcon";
import USDCIcon from "./USDCIcon";
import USDTIcon from "./USDTIcon";
import BitcoinIcon from "./BitcoinIcon";

const Box1 = ({ trigger }: { trigger: boolean }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        Multiple <span>Cryptocurrency</span> to choose from
      </div>

      <div
        className={`${classes.sectionWrapper} ${trigger && classes.trigger}`}
      >
        <div className={classes.section}>
          <LogoWrapper>
            <BitcoinIcon /> Bitcoin
          </LogoWrapper>
          <LogoWrapper>
            <USDTIcon /> USDT
          </LogoWrapper>
          <LogoWrapper>
            <USDCIcon /> USDC
          </LogoWrapper>
          <LogoWrapper>
            <LitecoinIcon /> Litecoin
          </LogoWrapper>
        </div>
        <div className={classes.section}>
          <LogoWrapper>
            <CardanoIcon /> Cardano
          </LogoWrapper>
          <LogoWrapper>
            <TronIcon /> Tron
          </LogoWrapper>
          <LogoWrapper>
            <DaiIcon /> DAI
          </LogoWrapper>
          <LogoWrapper>
            <CosmosIcon /> Cosmos
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
