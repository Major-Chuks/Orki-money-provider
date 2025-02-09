"use client";

import React from "react";
import Aggregates from "./homePage/Aggregates/Aggregates";
import Connecting from "./homePage/Connecting/Connecting";
import ContactUs from "./homePage/ContactUs/ContactUs";
import Header from "./homePage/Header/Header";
import Integration from "./homePage/Integration/Integration";
import Orchestrations from "./homePage/Orchestrations/Orchestrations";
import SmartRouting from "./homePage/SmartRouting/SmartRouting";
import Solution from "./homePage/Soltution/Solution";
import WhyUs from "./homePage/WhyUs/WhyUs";

export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <Solution />
      <Connecting />
      <WhyUs />
      <Orchestrations />
      <Aggregates />
      <SmartRouting />
      <Integration />
      <ContactUs />
    </React.Fragment>
  );
}
