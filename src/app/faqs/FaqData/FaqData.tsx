"use client";

import { useState } from "react";
import classes from "./FaqData.module.css";
import { faqs } from "./Faqs.script";
import Responsive from "@/components/Responsive/Responsive";

const FaqData = () => {
  const [activeFaq, setActiveFaq] = useState(-1);

  const handleToggle = (idx: number) => {
    if (idx === activeFaq) {
      setActiveFaq(-1);
    } else {
      setActiveFaq(idx);
    }
  };

  return (
    <Responsive>
      <div className={classes.container}>
        {faqs.map(({ question, answer }, idx) => (
          <div
            onClick={() => handleToggle(idx)}
            key={idx}
            className={`${classes.faqWrapper} ${
              idx === activeFaq && classes.active
            }`}
          >
            <div className={classes.question}>
              {question}
              <div className={classes.toggle}>
                <div className={classes.line}></div>
                <div className={classes.line}></div>
              </div>
            </div>
            <div className={classes.answer}>{answer}</div>
          </div>
        ))}
      </div>
    </Responsive>
  );
};

export default FaqData;
