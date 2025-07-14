"use client";

import { useState } from "react";
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import Ramps from "./Ramps/Ramps";
import WidgetLayout from "./WidgetLayout/WidgetLayout";
import Swap from "./Swap/Swap";
import CountrySearch from "./CountrySearch/CountrySearch";
import Sidebar from "./Sidebar/Sidebar";
import { ICountryData } from "@/constants/country";
import WidgetFooter from "./WidgetFooter/WidgetFooter";

export type WidgetType = "Onramp" | "Offramp" | "Swap Crypto";

const Widget = () => {
  const [widgetType, setWidgetType] = useState<WidgetType>("Onramp");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCountrySearch, setOpenCountrySearch] = useState(false);
  const [country, setCountry] = useState<ICountryData | null>(null);

  const handleCountryChange = async (country: ICountryData) => {
    setCountry(country);
  };

  return (
    <WidgetLayout>
      <WidgetHeader
        widgetType={widgetType}
        onMenuClick={() => setOpenSidebar(true)}
        onWidgetChange={setWidgetType}
      />

      {(widgetType === "Offramp" || widgetType === "Onramp") && (
        <Ramps type={widgetType} country={country} />
      )}

      {widgetType === "Swap Crypto" && <Swap />}

      {/* Widget Footer */}
      <WidgetFooter />

      {openCountrySearch && (
        <CountrySearch
          overlayOnly={true}
          country={country}
          onCountryChange={handleCountryChange}
          onClose={() => setOpenCountrySearch(false)}
        />
      )}

      {openSidebar && (
        <Sidebar
          country={country}
          onClose={() => setOpenSidebar(false)}
          onCountrySearch={() => setOpenCountrySearch(true)}
        />
      )}
    </WidgetLayout>
  );
};

export default Widget;
