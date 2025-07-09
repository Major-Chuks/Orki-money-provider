import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import classes from "./Payment.module.css";
import CardIcon from "@/assets/app/CardIcon";
import {
  useFetchBillingInfoQuery,
  useListPaymentMethodsQuery,
} from "@/services/queryApis";
import { get_listPaymentMethods } from "@/types/apis/billing/get_listPaymentMethods";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import DeletePaymentCardModal from "../../Billing/DeletePaymentCardModal/DeletePaymentCardModal";
import SetDefaultCardModal from "../../Billing/SetDefaultCardModal/SetDefaultCardModal";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import AddPaymentCardModal from "../../Billing/AddPaymentCardModal/AddPaymentCardModal";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import CustomTextInput from "@/components/CustomInput/CustomTextInput/CustomTextInput";
import { ICountryData } from "@/constants/country";
import CustomCountrySelect from "@/components/CustomInput/CustomCountrySelect/CustomCountrySelect";
import CustomEmailInput from "@/components/CustomInput/CustomEmailInput/CustomEmailInput";
import Button from "@/components/CustomInput/Button/Button";
import backend from "@/services/apis";
import { useToast } from "@/context/Toast/ToastContext";
import { get_fetchBillingInfo } from "@/types/apis/userProfile/get_fetchBillingInfo";

const inputKeys = {
  name: "name",
  line1: "line1",
  city: "city",
  state: "state",
  country: "country",
  postal_code: "postal_code",
};

const Payment = () => {
  const [input, setInput] = useState({
    name: "",
    line1: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  const {
    data: pmData,
    isPending: isPmPending,
    isError: isPmError,
    refetch: refetchPm,
  } = useListPaymentMethodsQuery();
  const paymentMethods: get_listPaymentMethods = pmData?.data.data;

  const { data: biData, isPending: isBiPending } = useFetchBillingInfoQuery();
  const billingInfo: get_fetchBillingInfo = biData?.data.data;

  const [action, setAction] = useState<{
    type: "delete" | "set_default" | "";
    id: string;
  }>({ type: "", id: "" });
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (!id) return;
    setInput((i) => ({ ...i, [id]: value }));
  };

  const handleCountrySelect = (selected: ICountryData) => {
    setInput((i) => ({
      ...i,
      [inputKeys.country]: selected.code,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const { name, ...address } = input;
    const response = await backend().patch_updateBillingInfo({
      name,
      address,
    });
    if (response) {
      showToast("Business info updated successfully", "success");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isBiPending && billingInfo) {
      const name = billingInfo.name;
      const address = billingInfo.address;
      setInput({
        name,
        line1: address.line1,
        city: address.city,
        state: address.state,
        country: address.country,
        postal_code: address.postal_code,
      });
    }
  }, [isBiPending, billingInfo]);

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        {isPmPending ? (
          <LoadingScreen style={{ height: "40vh" }} />
        ) : isPmError ? (
          <ErrorScreen style={{ height: "40vh" }} />
        ) : paymentMethods ? (
          <>
            <div className={classes.cardWrapper}>
              <div className={classes.title}>Your Payment Methods</div>
              {paymentMethods.data.map((pm, idx) => (
                <div key={idx}>
                  <div className={classes.card}>
                    <CardIcon />
                    <div>
                      <div className={classes.details}>
                        <div className={classes.cardNo}>
                          {pm.brand} •••• {pm.last4}
                        </div>
                        <div className={classes.date}>
                          Expires {pm.exp_month}/{pm.exp_year}
                        </div>
                      </div>

                      <div className={classes.cardBtnWrapper}>
                        {pm.is_default ? (
                          <div className={classes.status}>Default</div>
                        ) : (
                          <ButtonWrapper
                            className={classes.setDefaultBtn}
                            onClick={() =>
                              setAction({ id: pm.id, type: "set_default" })
                            }
                          >
                            Set Default
                          </ButtonWrapper>
                        )}

                        <ButtonWrapper
                          className={classes.deleteBtn}
                          onClick={() =>
                            setAction({ id: pm.id, type: "delete" })
                          }
                        >
                          <Trash2 />
                        </ButtonWrapper>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.btnWrapper}>
              <Button onClick={() => setOpenForm(true)}>
                Add Payment Method
              </Button>
            </div>
          </>
        ) : (
          <div>No Payment methods</div>
        )}
      </div>

      <div className={classes.section}>
        <SettingsHeader
          title="Billing Information"
          description="Your billing line1 and tax information"
        />

        {isBiPending ? (
          <LoadingScreen style={{ height: "40vh" }} />
        ) : billingInfo ? (
          <>
            <div className={classes.inputWrapper}>
              <CustomTextInput
                id={inputKeys.name}
                value={input.name as string}
                placeholder="Alex Johnson"
                label="Billing Name"
                onChange={handleChange}
              />
              <CustomTextInput
                // id={inputKeys.email}
                value={billingInfo.email as string}
                placeholder="alex.johnson@example.com"
                label="Billing Email"
                onChange={handleChange}
                disabled
              />
              <CustomTextInput
                id={inputKeys.line1}
                value={input.line1 as string}
                placeholder="123 Main St"
                label="Address"
                onChange={handleChange}
              />
              <CustomEmailInput
                id={inputKeys.city}
                value={input.city as string}
                placeholder="Ababa"
                label="City"
                onChange={handleChange}
              />
              <CustomTextInput
                id={inputKeys.state}
                value={input.state as string}
                placeholder="Dubai"
                label="State"
                onChange={handleChange}
              />
              <CustomCountrySelect
                id={inputKeys.country}
                value={input.country as string}
                label="Country of Incorporation"
                onSelect={handleCountrySelect}
              />
              <CustomTextInput
                id={inputKeys.postal_code}
                value={input.postal_code as string}
                placeholder="94105"
                label="ZIP Code"
                onChange={handleChange}
              />
            </div>

            <div className={classes.btnWrapper}>
              <Button loading={loading} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </>
        ) : null}
      </div>

      {action.type === "delete" && (
        <DeletePaymentCardModal
          cardId={action.id}
          onClose={() => {
            setAction({ type: "", id: "" });
            refetchPm();
          }}
        />
      )}

      {action.type === "set_default" && (
        <SetDefaultCardModal
          cardId={action.id}
          onClose={() => {
            setAction({ type: "", id: "" });
            refetchPm();
          }}
        />
      )}

      {openForm ? (
        <AddPaymentCardModal
          onClose={() => {
            setOpenForm(false);
            refetchPm();
          }}
        />
      ) : null}
    </div>
  );
};

export default Payment;
