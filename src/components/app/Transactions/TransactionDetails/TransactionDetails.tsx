import CloseIcon from "@/assets/app/CloseIcon";
import classes from "./TransactionDetails.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import TooltipIcon from "@/assets/app/TooltipIcon";
import ModalLayout from "../../Modals/ModalLayout";
import { useFindTransactionQuery } from "@/services/queryApis";
import { get_findTransaction } from "@/types/apis/transactions/get_findTransaction";
import { formatDate, formatText } from "@/services/utils";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import TableStatus from "../../TableStatus/TableStatus";

const TransactionDetails = ({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => {
  const { data, isPending, isError } = useFindTransactionQuery({
    transactionId: id,
  });

  const tx: get_findTransaction = data?.data.data;

  return (
    <ModalLayout onClose={onClose}>
      {({ close }) => (
        <div className={classes.modal}>
          {isPending ? (
            <LoadingScreen />
          ) : isError ? (
            <ErrorScreen />
          ) : !tx ? (
            <div>No result found</div>
          ) : (
            <>
              <div className={classes.header}>
                <div className={classes.headerTitle}>Transaction {tx.id}</div>
                <ButtonWrapper onClick={close} className={classes.close}>
                  <CloseIcon />
                </ButtonWrapper>
              </div>
              <div className={classes.section}>
                <div className={classes.sectionTitle}>Transaction Details</div>
                <div className={classes.detailsGrid}>
                  <div className={classes.item}>
                    <div className={classes.name}>Onramp Transaction ID</div>
                    <div className={classes.value}>{tx.provider_tx_id}</div>
                  </div>
                  <div className={classes.item}>
                    <div className={classes.name}>Partner ID</div>
                    <div className={classes.value}>{""}</div>
                  </div>
                  <div className={classes.item}>
                    <div className={classes.name}>Status</div>
                    <TableStatus status={tx.status}>{tx.status}</TableStatus>
                  </div>
                  <div className={classes.item}>
                    <div className={classes.name}>Provider</div>
                    <div className={classes.value}>
                      {formatText(tx.provider)}
                    </div>
                  </div>
                  <div className={classes.item}>
                    <div className={classes.name}>Date & Time</div>
                    <div className={classes.value}>
                      {formatDate(tx.created_at)}
                    </div>
                  </div>
                  <div className={classes.item}>
                    <div className={classes.name}>Transaction Type</div>
                    <div className={classes.value}>{formatText(tx.type)}</div>
                  </div>
                </div>
              </div>
              <div className={classes.section}>
                <div className={classes.sectionTitle}>
                  Amount Details
                  <div
                    data-tooltip-id="amount-tooltip"
                    data-tooltip-content="Address where the crypto was delivered"
                    className={classes.tooltipContainer}
                  >
                    <TooltipIcon />
                  </div>
                  <Tooltip
                    id="amount-tooltip"
                    style={{ fontSize: "12px", fontFamily: "DM Sans" }}
                  />
                </div>

                <div className={classes.detailsColumn}>
                  <div className={classes.item}>
                    <div className={classes.name}>Wallet Address</div>
                    <div className={classes.address}>
                      {tx.recipient_address || "--"}{" "}
                    </div>
                  </div>

                  <div className={classes.item}>
                    <div className={classes.name}>Transaction Hash</div>
                    <div className={classes.hash}>
                      {tx.transaction_hash || "--"}{" "}
                    </div>
                  </div>

                  <div className={classes.dataFlex}>
                    <div className={classes.item}>
                      <div className={classes.name}>Fiat Amount</div>
                      <div
                        style={{ fontWeight: "700" }}
                        className={classes.value}
                      >
                        {tx.fiat_amount} {tx.fiat_currency}
                      </div>
                    </div>
                    <div className={classes.item}>
                      <div className={classes.name}>Crypto Amount</div>
                      <div
                        style={{ fontWeight: "700" }}
                        className={classes.value}
                      >
                        {tx.crypto_amount} {tx.crypto_currency}
                      </div>
                    </div>
                    <div className={classes.item}>
                      <div className={classes.name}>Exchange Rate</div>
                      <div className={classes.value}>{tx.exchange_rate}</div>
                    </div>
                    <div className={classes.item}>
                      <div className={classes.name}>Payment Method</div>
                      <div className={classes.value}>
                        {formatText(tx.payment_method)}
                      </div>
                    </div>
                    <div className={classes.item}>
                      <div className={classes.name}>Network</div>
                      <div className={classes.value}>
                        {formatText(tx.network)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.section}>
                <div className={classes.sectionTitle}>Fee Breakdown</div>
                <div className={classes.dataFlex}>
                  <div className={classes.item}>
                    <div className={classes.name}>Network Fee</div>
                    <div className={classes.value}>{tx.network_fee}</div>
                  </div>
                  <div className={classes.item}>
                    <div className={classes.name}>Provider Fee</div>
                    <div className={classes.value}>{tx.provider_fee}</div>
                  </div>
                  <div className={classes.item}>
                    <div className={classes.name}>Orki Fee</div>
                    <div className={classes.value}>{tx.orki_fee}</div>
                  </div>
                  <div className={classes.line}></div>
                  <div className={classes.item}>
                    <div className={classes.total}>Total Fee</div>
                    <div className={classes.total}></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </ModalLayout>
  );
};

export default TransactionDetails;
