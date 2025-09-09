import classes from "./AdvancedSearch.module.css";
import CustomDateInput from "@/components/CustomInput/CustomDateInput/CustomDateInput";
import CustomSelect, {
  Option,
} from "@/components/CustomInput/CustomSelect/CustomSelect";
import { useEffect, useRef, useState } from "react";
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
  payment_method: string;
  processed_at: string;
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
    payment_method: "",
    processed_at: ",",
  });

  // Refs for dropdown positioning
  const statusRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const fiatRef = useRef<HTMLDivElement>(null);
  const cryptoRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);
  const paymentMethodRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: InputIdState
  ) => {
    const value = event.target.value;
    if (!id) return;

    if (id === "from" || id === "to") {
      const cb = input["processed_at"].split(",");
      if (id === "from") {
        cb[0] = value;
      } else {
        cb[1] = value;
      }
      const cbStr = cb.join(",");
      setInput((i) => ({ ...i, processed_at: cbStr }));
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
      payment_method: "",
      processed_at: ",",
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
        ref={statusRef}
        id="status"
        label="Status"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["status"]}
        options={[
          { id: "pending", name: "Pending" },
          { id: "success", name: "Success" },
          { id: "failed", name: "Failed" },
        ]}
        portalTo="trn_filter"
      />

      <CustomSelect
        ref={typeRef}
        id="type"
        label="Type"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["type"]}
        options={[
          { id: "buy", name: "Buy" },
          { id: "sell", name: "Sell" },
        ]}
        portalTo="trn_filter"
      />

      <CustomSelect
        ref={fiatRef}
        id="fiat_currency"
        label="Fiat Currency"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["fiat_currency"]}
        options={FIAT_CURRENCY.map((c) => ({
          id: c.symbol.toLowerCase(),
          name: c.symbol,
        }))}
        portalTo="trn_filter"
      />

      <CustomSelect
        ref={cryptoRef}
        id="crypto_currency"
        label="Crypto Currency"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["crypto_currency"]}
        options={CRYPTO_TOKENS.map((c) => ({
          id: c.id,
          name: c.name,
        }))}
        portalTo="trn_filter"
      />

      <CustomSelect
        ref={networkRef}
        id="network"
        label="Network"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["network"]}
        options={NETWORKS.filter(Boolean).map((n) => ({
          id: n.toLowerCase(),
          name: formatText(n),
        }))}
        portalTo="trn_filter"
      />

      <CustomSelect
        ref={paymentMethodRef}
        id="payment_method"
        label="Payment Method"
        placeholder="Select"
        onSelect={handleSelect}
        value={input["payment_method"]}
        options={[
          { id: "card", name: "Card" },
          { id: "transfer", name: "Transfer" },
          { id: "money_mobile", name: "Money Mobile" },
        ]}
        portalTo="trn_filter"
      />

      <CustomDateInput
        onChange={handleChange}
        id="from"
        label="From"
        placeholder="yyyy-mm-dd"
        value={input["processed_at"].split(",")[0]}
      />

      <CustomDateInput
        onChange={handleChange}
        id="to"
        label="To"
        placeholder="yyyy-mm-dd"
        value={input["processed_at"].split(",")[1]}
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
