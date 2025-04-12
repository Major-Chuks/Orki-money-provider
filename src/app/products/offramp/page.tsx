"use client";
import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import Transactions from "./Transactions/Transactions";
import Form from "./Form/Form";

const Offramp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <Hero />
      <Transactions />
      <Form />
    </React.Fragment>
  );
};

export default Offramp;
