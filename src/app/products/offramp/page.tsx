"use client";
import React from "react";
import Hero from "./Hero/Hero";
import Transactions from "./Transactions/Transactions";
import Form from "./Form/Form";

const Offramp = () => {
  return (
    <React.Fragment>
      <Hero />
      <Transactions />
      <Form />
    </React.Fragment>
  );
};

export default Offramp;
