"use client";
import React from "react";
import ContactUs from "@/app/homePage/ContactUs/ContactUs";
import Hero from "./Hero/Hero";
import Streamlined from "./Streamlined/Stremlined.";
import Features from "./Features/Features";
import Infrastructure from "./Infrastructure/Infrastructure";
import Benefits from "./Benefits/Benefits";

const Swap = () => {
  return (
    <React.Fragment>
      <Hero />
      <Streamlined />
      <Features />
      <Infrastructure />
      <Benefits />
      <ContactUs
        title="Looking for an integration?"
        description="Unlock Crypto Success: Your Shortcut to Smarter and Refined Transactions with us."
      />
    </React.Fragment>
  );
};

export default Swap;
