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
import WidgetDrawer from "./WidgetDrawer/WidgetDrawer";
// import { useAppKitAccount, useAppKitState } from "@reown/appkit/react";
export type WidgetType = "Onramp" | "Offramp" | "Swap Crypto";

const Widget = () => {
  const [widgetType, setWidgetType] = useState<WidgetType>("Onramp");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCountrySearch, setOpenCountrySearch] = useState(false);
  const [country, setCountry] = useState<ICountryData | null>(null);

  // const { initialized, loading, selectedNetworkId, activeChain } =
  //   useAppKitState();
  // const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
  //   useAppKitAccount();

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

      <WidgetFooter />

      {openCountrySearch && (
        <WidgetDrawer onClose={() => setOpenCountrySearch(false)}>
          {({ close }) => (
            <CountrySearch
              country={country}
              onCountryChange={handleCountryChange}
              onClose={close}
            />
          )}
        </WidgetDrawer>
      )}

      {openSidebar && (
        <WidgetDrawer
          direction="ltr"
          onClose={() => setOpenSidebar(false)}
          modalStyle={{ height: "100%", borderRadius: "0", maxWidth: "355px" }}
        >
          {({ close }) => (
            <Sidebar
              country={country}
              onClose={close}
              onCountrySearch={() => {
                close();
                setOpenCountrySearch(true);
              }}
            />
          )}
        </WidgetDrawer>
      )}
    </WidgetLayout>
  );
};

export default Widget;
