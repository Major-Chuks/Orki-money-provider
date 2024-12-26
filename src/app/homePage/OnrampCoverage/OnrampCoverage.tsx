import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { onrampCoverageData } from "./data";

// GeoJSON URL for world map
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

// Define the shape of onrampCoverageData's entries
interface CountryData {
  name: string;
  paymentMethods: string;
  onramps: number;
}

const Map: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState<string>("");

  // Geo type
  interface Geo {
    id: string;
    rsmKey: string;
  }

  const handleMouseEnter = (geo: Geo) => {
    const id = geo.id;
    const country = onrampCoverageData[
      id as keyof typeof onrampCoverageData
    ] as CountryData | undefined;

    if (country) {
      setTooltipContent(
        `<strong>${country.name}</strong><br/>
        Payment Methods: ${country.paymentMethods}<br/>
        No of onramps: ${country.onramps}`
      );
    } else {
      setTooltipContent("No data available");
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <>
      <ComposableMap data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: Geo[] }) =>
            geographies.map((geo) => (
              <Geography
                data-tooltip-id="tooltip"
                data-tooltip-html={tooltipContent}
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => handleMouseEnter(geo)}
                onMouseLeave={handleMouseLeave}
                style={{
                  default: { fill: "#AEACFF", outline: "none" },
                  hover: { fill: "#2D29D7", outline: "none" },
                  pressed: { fill: "#2D29D7", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <Tooltip id="tooltip" />
    </>
  );
};

export default Map;
