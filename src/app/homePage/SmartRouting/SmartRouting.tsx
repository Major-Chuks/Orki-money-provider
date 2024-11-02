import H1 from "@/components/Typography/H1/H1";
import classes from "./SmartRouting.module.css";
import P from "@/components/Typography/P/P";
import Responsive from "@/components/Responsive/Responsive";

const SmartRouting = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.heading}>
          <H1 style={{ textAlign: "center" }}>
            Smart Routing for seamless crypto access!
          </H1>
          <P style={{ textAlign: "center" }}>
            Our smart routing technology acts as your personal crypto navigator,
            ensuring that every transaction is swift and straightforward which
            helps you connect to perfect onramps. Say goodbye to the
            complexities of the crypto world, and let our technology make your
            journey hassle-free.
          </P>
        </div>
        <div className={classes.image}></div>
      </div>
    </Responsive>
  );
};

export default SmartRouting;
