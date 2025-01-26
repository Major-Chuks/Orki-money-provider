import classes from "./Transactions.module.css";
import icon1 from "@/assets/transactions-1.png";
import icon2 from "@/assets/transactions-2.png";
import icon3 from "@/assets/transactions-3.png";
import Image from "next/image";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";

const Transactions = () => {
  return (
    <div className={classes.wrapper}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            <h1 className={classes.title}>
              <SlideUp>
                Sell Crypto Effortlessly: Simplifying Transactions for Your
                Users
              </SlideUp>
            </h1>
            <div className={classes.subHeading}>
              <SlideUp>
                Unlock hassle-free crypto selling with our user-centric
                platform—seamless, secure, and tailored for swift transactions
                worldwide.
              </SlideUp>
            </div>
          </div>

          <div className={classes.listContainer}>
            <SlideUp>
              <div className={classes.box}>
                <Image src={icon1} alt="" />
              </div>
            </SlideUp>
            <SlideUp>
              <div className={classes.box}>
                <Image src={icon2} alt="" />
              </div>
            </SlideUp>
            <SlideUp>
              <div className={classes.box}>
                <Image src={icon3} alt="" />
              </div>
            </SlideUp>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Transactions;
