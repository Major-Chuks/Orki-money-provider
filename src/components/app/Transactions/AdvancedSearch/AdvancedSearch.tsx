import classes from "./AdvancedSearch.module.css";
import CustomDateInput from "@/components/CustomInput/CustomDateInput/CustomDateInput";
import CustomSelect, {
  Option,
} from "@/components/CustomInput/CustomSelect/CustomSelect";
import { useEffect, useState } from "react";
import {
  InputIdState,
  InputState,
} from "@/components/CustomInput/CustomInput.script";
import Button from "@/components/CustomInput/Button/Button";
import { FIAT_CURRENCY } from "@/constants/fiatCurrency";
import { CRYPTO_TOKENS } from "@/constants/cryptoTokens";
import { NETWORKS } from "@/constants/networks";
import { formatText } from "@/services/utils";

export type SearchParamsType = {
  status: string;
  type: string;
  fiat: string;
  crypto: string;
  network: string;
  paymentMethod: string;
  created_between: string;
};

const AdvancedSearch = ({
  onSearch,
}: {
  onSearch: (searchParams: SearchParamsType) => void;
}) => {
  const [input, setInput] = useState<InputState>({
    status: "",
    type: "",
    fiat: "",
    crypto: "",
    network: "",
    paymentMethod: "",
    created_between: ",",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: InputIdState
  ) => {
    const value = event.target.value;
    if (!id) return;

    if (id === "from" || id === "to") {
      const cb = input["created_between"].split(",");
      if (id === "from") {
        cb[0] = value;
      } else {
        cb[1] = value;
      }
      const cbStr = cb.join(",");
      setInput((i) => ({ ...i, created_between: cbStr }));
    } else {
      setInput((i) => ({ ...i, [id]: value }));
    }
  };

  const handleSelect = (selected: Option, id?: InputIdState) => {
    if (!id) return;
    setInput((i) => ({ ...i, [id]: selected.id }));
  };

  const resetSearch = () => {
    const _input = {
      status: "",
      type: "",
      fiat: "",
      crypto: "",
      network: "",
      paymentMethod: "",
      created_between: ",",
    };
    setInput(_input);
    onSearch(_input as unknown as SearchParamsType);
  };

  useEffect(() => {
    onSearch(input as unknown as SearchParamsType);
  }, [input]);

  return (
    <div className={classes.container}>
      <CustomSelect
        options={[
          {
            id: "pending",
            name: "Pending",
          },
          {
            id: "success",
            name: "Success",
          },
          {
            id: "failed",
            name: "Failed",
          },
        ]}
        id="status"
        label="Status"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["status"]}
      />

      <CustomSelect
        options={[
          {
            id: "buy",
            name: "Buy",
          },
          {
            id: "sell",
            name: "Sell",
          },
        ]}
        id="type"
        label="Type"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["type"]}
      />

      <CustomSelect
        options={FIAT_CURRENCY.map((c) => ({
          id: c.symbol.toLowerCase(),
          name: c.symbol,
        }))}
        id="fiat_currency"
        label="Fiat Currency"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["fiat_currency"]}
      />

      <CustomSelect
        options={CRYPTO_TOKENS.map((c) => ({
          id: c.id,
          name: c.name,
        }))}
        id="crypto_currency"
        label="Crypto Currency"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["crypto_currency"]}
      />

      <CustomSelect
        options={NETWORKS.filter((n) => n).map((n) => ({
          id: n.toLowerCase(),
          name: formatText(n),
        }))}
        id="network"
        label="Network"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["network"]}
      />

      <CustomSelect
        options={[
          {
            id: "card",
            name: "Card",
          },
          {
            id: "transfer",
            name: "Transfer",
          },
          {
            id: "money_mobile",
            name: "Money Mobile",
          },
        ]}
        id="paymentMethod"
        label="Payment Method"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["paymentMethod"]}
      />

      <CustomDateInput
        onChange={handleChange}
        id="from"
        label="From"
        placeholder="yyyy-mm-dd"
        value={input["created_between"].split(",")[0]}
      />

      <CustomDateInput
        onChange={handleChange}
        id="to"
        label="To"
        placeholder="yyyy-mm-dd"
        value={input["created_between"].split(",")[1]}
      />

      <div className={classes.wrapper}>
        <Button
          style={{
            width: "100%",
            height: "52px",
            borderRadius: "8px",
            border: "2px solid var(--gray-100, #F3F4F6)",
            background: "var(--white, #FFF)",
            color: "#9CA3AF",
          }}
          onClick={resetSearch}
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
