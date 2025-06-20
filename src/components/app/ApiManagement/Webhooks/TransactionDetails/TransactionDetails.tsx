import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionDetails.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import CloseIcon from "@/assets/app/CloseIcon";
import ArrowDown from "@/assets/app/ArrowDown";
import CopyIcon from "@/assets/app/CopyIcon";
import Copy from "@/components/app/Copy/Copy";
import ModalLayout from "@/components/app/Modals/ModalLayout";
import { get_webhookLogs } from "@/types/apis/webhook/get_webhookLogs";

const TransactionDetails = ({
  data,
  onClose,
}: {
  data: get_webhookLogs["webhook_logs"][number];
  onClose: () => void;
}) => {
  const code = {
    transaction_id: data.id,
    status: data.status,
    amount: "--",
    currency: "--",
    timestamp: data.last_attempted_at,
  };

  return (
    <ModalLayout onClose={onClose}>
      {({ close }) => (
        <div className={classes.container}>
          <div className={classes.headerWrapper}>
            <div className={classes.header}>
              <div className={classes.title}>
                <div>Webhook Details</div>
                <TableStatus status="success">Success</TableStatus>
              </div>
              <div className={classes.description}>Webhook ID: {data.id}</div>
            </div>

            <ButtonWrapper onClick={close} className={classes.close}>
              <CloseIcon />
            </ButtonWrapper>
          </div>

          <div className={classes.line}></div>

          <div className={classes.gridBox}>
            <div className={classes.item}>
              <div className={classes.name}>Transaction Ref</div>
              <div className={classes.value}>{data.transaction_id}</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Retries</div>
              <div className={classes.value}>{"--"}</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Delivery Time</div>
              <div className={classes.value}>{data.last_attempted_at}</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Status</div>
              <div className={classes.value}>
                <TableStatus status={data.status}>{data.status}</TableStatus>
              </div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>URL</div>
              <div className={classes.value}>{data.url}</div>
            </div>
          </div>

          <div className={classes.line}></div>

          <div className={classes.codeWrapper}>
            <div className={classes.tab}>
              Show Raw Payload <ArrowDown />
            </div>

            <div className={classes.codeContainer}>
              <pre>
                <code>{JSON.stringify(code, null, 2)}</code>
              </pre>
            </div>
          </div>

          <div className={classes.copyIcon}>
            <Copy value={JSON.stringify(code, null, 2)}>
              <ButtonWrapper className={classes.iconBtn}>
                <CopyIcon /> Copy JSON
              </ButtonWrapper>
            </Copy>
          </div>
        </div>
      )}
    </ModalLayout>
  );
};

export default TransactionDetails;
