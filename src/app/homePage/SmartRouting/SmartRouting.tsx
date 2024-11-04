import classes from "./SmartRouting.module.css";
import Responsive from "@/components/Responsive/Responsive";
import smartRouting from "@/assets/smart routing.png";
import Image from "next/image";

const SmartRouting = () => {
  return (
    <Responsive>
      <div className={classes.container}>
        <div className={classes.heading}>
          <div className={classes.title}>
            Smart Routing for seamless crypto access!
          </div>
          <div className={classes.description}>
            Our smart routing technology acts as your personal crypto navigator,
            ensuring that every transaction is swift and straightforward which
            helps you connect to perfect onramps. Say goodbye to the
            complexities of the crypto world, and let our technology make your
            journey hassle-free.
          </div>
        </div>
        <div className={classes.image}>
          <Image src={smartRouting} alt="" />
        </div>
      </div>
    </Responsive>
  );
};

export default SmartRouting;
