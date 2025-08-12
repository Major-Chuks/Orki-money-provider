"use client";

import { useEffect, useState } from "react";
import WidgetHeader from "./WidgetHeader/WidgetHeader";
import Ramps from "./Ramps/Ramps";
import WidgetLayout from "./WidgetLayout/WidgetLayout";
import Swap from "./Swap/Swap";
import CountrySearch from "./CountrySearch/CountrySearch";
import Sidebar from "./Sidebar/Sidebar";
import { COUNTRY_DATA, ICountryData } from "@/constants/country";
import WidgetFooter from "./WidgetFooter/WidgetFooter";
import WidgetDrawer from "./WidgetDrawer/WidgetDrawer";
import { usePathname } from "next/navigation";
import { useGetUserLocation } from "@/services/apis_tanstack";
import { get_user_location } from "@/interface/get_user_location";
import { WidgetType } from "@/types";
// import { useAppKitAccount, useAppKitState } from "@reown/appkit/react";

const OldWidget = () => {
  const pathname = usePathname();
  const [widgetType, setWidgetType] = useState<WidgetType>(
    pathname === "/products/swaps" ? "Swap Crypto" : "Onramp"
  );
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCountrySearch, setOpenCountrySearch] = useState(false);
  const [country, setCountry] = useState<ICountryData | null>(null);

  const { data: locationResponse } = useGetUserLocation("");

  const handleCountryChange = async (country: ICountryData) => {
    setCountry(country);
  };

  useEffect(() => {
    if (locationResponse) {
      const location: get_user_location = locationResponse?.data.data;
      const _country = COUNTRY_DATA.find(
        (cd) => cd.code.toLowerCase() === location.country.toLowerCase()
      );
      if (_country) {
        setCountry(_country);
      }
    }
  }, [locationResponse]);

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

export default OldWidget;
