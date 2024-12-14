"use client";

import React from "react";
import Hero from "./Hero/Hero";
import Connectivity from "./Connectivity/Connectivity";
import SmartRouting from "@/app/homePage/SmartRouting/SmartRouting";
import ContactUs from "@/app/homePage/ContactUs/ContactUs";

const Api = () => {
  return (
    <React.Fragment>
      <Hero />
      <Connectivity />
      <SmartRouting />
      <ContactUs
        title="Unite with us: For Onramping to financial victory!"
        description="Unlock Crypto Success: Your Shortcut to Smarter and Refined Transactions with us."
      />
    </React.Fragment>
  );
};

export default Api;
