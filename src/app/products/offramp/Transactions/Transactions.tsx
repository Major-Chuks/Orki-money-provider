import classes from "./Transactions.module.css";
import icon1 from "@/assets/transactions-1.png";
import icon2 from "@/assets/transactions-2.png";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";

const Transactions = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <h1 className={classes.title}>
              Sell Crypto Effortlessly: Simplifying Transactions for Your Users
            </h1>
            <p className={classes.description}>
              Unlock hassle-free crypto selling with our user-centric
              platform—seamless, secure, and tailored for swift transactions
              worldwide.
            </p>
          </div>

          <div className={classes.listContainer}>
            <div className={classes.box}>
              <Image src={icon1} alt="" />
            </div>
            <div className={classes.box}>
              <Image src={icon2} alt="" />
            </div>
            <div className={classes.box}>
              {/* <Image src={icon3} alt="" /> */}
            </div>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Transactions;
