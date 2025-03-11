import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
// import { onrampCoverageData } from "./data";
import classes from "./OnrampCoverage.module.css";
import { onramper } from "./onramper";
import { COUNTRY_DATA } from "@/constants/country";
import Image from "next/image";
import TooltipComponentWrapper from "./TooltipComponentWrapper/TooltipComponentWrapper";
import backend from "@/services/apis";
import { COUNTRY, ICountry } from "@/services/country";
import { OnramperCoverage } from "@/services/onramperCoverage";

// GeoJSON URL for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const unSupportedLocations = [
  "AFG",
  "IRN",
  "IRQ",
  "LBY",
  "MMR",
  "PRK",
  "RUS",
  "SSD",
  "SOM",
  "YEM",
  "ZWE",
];

// Define the shape of onrampCoverageData's entries
interface CountryData {
  name: string;
  paymentMethods: string[];
  onramps: number;
}

type Coverage = {
  country: string;
  payment_methods: string[];
  providers: string[];
}[];

type OnrampCoverage = Record<
  string,
  {
    name: string;
    flag: string;
    paymentMethods: string[];
    onramps: number;
  }
>;

const Map: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<React.JSX.Element>(
    <></>
  );
  const [onrampCoverageData, setOnramperCoverageData] =
    useState<OnrampCoverage>({});

  // Geo type
  interface Geo {
    id: string;
    rsmKey: string;
  }

  const handleMouseEnter = (geo: Geo) => {
    const id = geo.id;
    const country = onrampCoverageData[id];

    const _onramper = onramper.find(
      (c) => c.country.toLowerCase() === country?.name.toLowerCase()
    );

    const flag = COUNTRY_DATA.find(
      (c) => c.name.toLowerCase() === country?.name.toLowerCase()
    )?.flag;

    setTooltipContent(
      <TooltipComponentWrapper id={id}>
        <div className={classes.tooltipContainer}>
          <div className={classes.country_flag}>
            <div className={classes.flag}>
              {flag && <Image width={32} height={32} src={flag} alt="" />}
            </div>
            <div className={classes.country}>{country?.name}</div>
          </div>
          <div className={classes.category}>
            <div className={classes.label}>Payment Methods</div>
            <div className={classes.list}>
              {_onramper?.local_payment_methods.map((item, idx) => (
                <div key={idx} className={classes.item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.category}>
            <div className={classes.label}>No of onramps</div>
            <div className={classes.list}>
              <div className={`${classes.item} ${classes.round}`}>
                {_onramper?.supported_onramps.length || 0}
              </div>
            </div>
          </div>
        </div>
      </TooltipComponentWrapper>
    );
  };

  const handleMouseLeave = () => {
    setTooltipContent(<></>);
  };

  const handleOnramperCoverage = (coverage: Coverage) => {
    const mapCountryByName: Record<string, ICountry> = {};
    COUNTRY.forEach((c) => {
      mapCountryByName[c.name.toLowerCase()] = c;
    });

    const coverageData: OnrampCoverage = {};

    for (const data of coverage) {
      const country = mapCountryByName[data.country.toLowerCase()];
      if (!country) {
        continue;
      }
      coverageData[country.country_code] = {
        name: country.name,
        flag: country.flag,
        paymentMethods: data.payment_methods,
        onramps: data.providers.length,
      };
    }

    setOnramperCoverageData(coverageData);
  };

  const handleFetch = async () => {
    handleOnramperCoverage(OnramperCoverage);

    const response = await backend().get_coverage();

    if (response) {
      handleOnramperCoverage(response.data);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    console.log(onrampCoverageData);
  }, [onrampCoverageData]);

  return (
    <>
      <ComposableMap data-tip="">
        <Geographies geography={"./geo-locations.json"}>
          {({ geographies }: { geographies: Geo[] }) =>
            geographies.map((geo) => {
              const isNotSupported = unSupportedLocations.includes(geo.id);
              return (
                <Geography
                  data-tooltip-id="tooltip"
                  // data-tooltip-html={tooltipContent}
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={() => handleMouseLeave()}
                  style={{
                    default: {
                      fill: isNotSupported ? "#e6e6e6" : "#AEACFF",
                      outline: "none",
                    },
                    hover: {
                      fill: isNotSupported ? "#e6e6e6" : "#2D29D7",
                      outline: "none",
                    },
                    pressed: {
                      fill: isNotSupported ? "#e6e6e6" : "#2D29D7",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <Tooltip
        style={{
          padding: "2px",
          background: "transparent",
          borderRadius: "32px",
        }}
        id="tooltip"
      >
        {tooltipContent}
      </Tooltip>
    </>
  );
};

export default Map;
