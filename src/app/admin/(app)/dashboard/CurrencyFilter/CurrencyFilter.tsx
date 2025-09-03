import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import classes from "./CurrencyFilter.module.css";
import { useEffect, useState } from "react";
import { useFetchFiatCurrenciesQuery } from "@/services/queryApis";
import { get_fetchFiatCurrencies } from "@/types/apis/utility/get_fetchFiatCurrencies";
import LoadingIcon from "@/assets/app/LoadingIcon";
import { ChevronDown } from "lucide-react";
import DropdownLayout from "@/components/app/Dropdown/DropdownLayout/DropdownLayout";
import DropdownWrapper from "@/components/app/Dropdown/DropdownWrapper/DropdownWrapper";

const CurrencyFilter = ({
  onChange,
}: {
  onChange: (currency: string) => void;
}) => {
  const [currency, setCurrency] = useState<string>("USD");

  const { data, isPending } = useFetchFiatCurrenciesQuery();
  const currencies: get_fetchFiatCurrencies = data?.data.data;

  useEffect(() => {
    onChange(currency);
  }, [currency]);

  return (
    <div className={classes.container}>
      <DropdownLayout>
        {({ open, toggle, close }) => (
          <>
            <ButtonWrapper>
              <div
                onClick={toggle}
                className={`${classes.selected} ${classes.item}`}
              >
                {isPending ? <LoadingIcon /> : currency}{" "}
                <ChevronDown width={12} height={12} />
              </div>
            </ButtonWrapper>

            {currencies && currencies.length ? (
              <DropdownWrapper open={open}>
                <div className={classes.dropdownContainer}>
                  <div className={classes.dropdown}>
                    {currencies.map((item, idx) => (
                      <div
                        onClick={() => {
                          setCurrency(item);
                          close();
                        }}
                        key={idx}
                        className={classes.item}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </DropdownWrapper>
            ) : null}
          </>
        )}
      </DropdownLayout>
    </div>
  );
};

export default CurrencyFilter;
