"use client";

import { useState } from "react";
import classes from "./Widget.module.css";
import menuIcon from "@/assets/widget/menu.svg";
import Image from "next/image";
import CryptoPanel from "./CryptoPanel/CryptoPanel";
import RatePanel from "./RatePanel/RatePanel";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import CustomButton from "../CustomInput/CustomButton/CustomButton";
import Sidebar from "./Sidebar/Sidebar";
import History from "./History/History";
import {
  fetchCountries,
  fetchCryptoCurrencies,
  fetchFiatCurrencies,
  fetchPricingQuotes,
  fetchUserCountry,
} from "./Widget.script";

const Widget = () => {
  const [active, setActive] = useState<"buy" | "sell">("buy");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleHistory, setToggleHistory] = useState(false);

  return (
    <div className={classes.container}>
      <button style={{ cursor: "pointer" }} onClick={fetchPricingQuotes}>
        Fetch pricing quotes
      </button>
      <button style={{ cursor: "pointer" }} onClick={fetchCryptoCurrencies}>
        Fetch crypto currencies
      </button>
      <button style={{ cursor: "pointer" }} onClick={fetchFiatCurrencies}>
        Fetch fiat currencies
      </button>
      <button style={{ cursor: "pointer" }} onClick={fetchCountries}>
        Fetch countries
      </button>
      <button style={{ cursor: "pointer" }} onClick={fetchUserCountry}>
        Fetch user country
      </button>
      {toggleSidebar && (
        <Sidebar
          onHistoryClick={() => setToggleHistory(true)}
          onClose={() => setToggleSidebar(false)}
        />
      )}
      {toggleHistory && <History onClose={() => setToggleHistory(false)} />}

      <div className={classes.heading}>
        <div className={classes.tabSwitch}>
          <div
            onClick={() => setActive("buy")}
            className={`${classes.tab} ${active === "buy" && classes.active} `}
          >
            Buy
          </div>
          <div
            onClick={() => setActive("sell")}
            className={`${classes.tab} ${active === "sell" && classes.active} `}
          >
            Sell
          </div>

          <div className={`${classes.underline} ${classes[active]}`}></div>
        </div>

        <div
          onClick={() => setToggleSidebar(true)}
          className={classes.menuIcon}
        >
          <Image src={menuIcon} alt="" />
        </div>
      </div>

      <div className={classes.panelWrapper}>
        <CryptoPanel type="fiat" title="You Pay" />
        <CryptoPanel type="crypto" title="You Receive" />
      </div>

      <RatePanel />

      <PaymentMethod />

      <CustomButton>Proceed</CustomButton>
    </div>
  );
};

export default Widget;
