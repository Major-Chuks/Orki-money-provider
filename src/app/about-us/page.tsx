"use client";

import React from "react";
import Hero from "./Hero/Hero";
import MisionAndVision from "./MisionAndVision/MisionAndVision";
import CoreValues from "./CoreValues/CoreValues";
import ContactUs from "../homePage/ContactUs/ContactUs";

const About = () => {
  return (
    <React.Fragment>
      {/* <Hero />
      <MisionAndVision />
      <CoreValues /> */}
      <ContactUs
        title="Unite with us: For Onramping to financial victory!"
        description="Unlock Crypto Success: Your Shortcut to Smarter and Refined Transactions with us."
      />
    </React.Fragment>
  );
};

export default About;
