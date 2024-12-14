"use client";
import React from "react";
import Hero from "./Hero/Hero";
import Streamlined from "./Streamlined/Stremlined.";
import UserExperience from "./UserExperience/UserExperience";
import ContactUs from "@/app/homePage/ContactUs/ContactUs";
import Visualize from "./Visualize/Visualize";

const Widget = () => {
  return (
    <React.Fragment>
      <Hero />
      <Streamlined />
      <UserExperience />
      <Visualize />
      <ContactUs
        title="Looking for an integration?"
        description="Unlock Crypto Success: Your Shortcut to Smarter and Refined Transactions with us."
      />
    </React.Fragment>
  );
};

export default Widget;
