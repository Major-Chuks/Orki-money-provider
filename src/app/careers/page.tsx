"use client";

import React from "react";
import Hero from "./Hero/Hero";
import Statistics from "./Statistics/Statistics";
import ValueAndCulture from "./ValueAndCulture/ValueAndCulture";
import Openings from "./Openings/Openings";

const CareerPage = () => {
  return (
    <React.Fragment>
      <Hero />
      <Statistics />
      <ValueAndCulture />
      <Openings />
    </React.Fragment>
  );
};

export default CareerPage;
