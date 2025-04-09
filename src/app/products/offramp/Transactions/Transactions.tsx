import classes from "./Transactions.module.css";
import Responsive from "@/components/Responsive/Responsive";
import SlideUp from "@/components/SlideUp/SlideUp";
import { useState } from "react";
import IntersectionObserver from "@/components/IntersectionObserver/IntersectionObserver";
import Box1 from "../Box1/Box1";
import Box2 from "../Box2/Box2";
import Box3 from "../Box3/Box3";

const Transactions = () => {
  const [isBox1, setIsBox1] = useState(false);
  const [isBox2, setIsBox2] = useState(false);
  const [isBox3, setIsBox3] = useState(false);

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
            <IntersectionObserver onIntersecting={setIsBox1}>
              <Box1 trigger={isBox1} />
            </IntersectionObserver>
            <IntersectionObserver onIntersecting={setIsBox3}>
              <Box2 trigger={isBox2} />
            </IntersectionObserver>
            <IntersectionObserver onIntersecting={setIsBox2}>
              <Box3 trigger={isBox3} />
            </IntersectionObserver>
          </div>
        </div>
      </Responsive>
    </div>
  );
};

export default Transactions;
