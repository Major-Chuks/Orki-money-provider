import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionDetails.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import CloseIcon from "@/assets/app/CloseIcon";
import ArrowDown from "@/assets/app/ArrowDown";
import CopyIcon from "@/assets/app/CopyIcon";
import Copy from "@/components/app/Copy/Copy";
import ModalLayout from "@/components/app/Modals/ModalLayout";

const TransactionDetails = ({ onClose }: { onClose: () => void }) => {
  const code = {
    transaction_id: "TXN-12345",
    status: "success",
    amount: 1250,
    currency: "USD",
    timestamp: "2023-04-28T15:30:22Z",
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
              <div className={classes.description}>
                Webhook ID: wh_1a2b3c4d5e6f
              </div>
            </div>

            <ButtonWrapper onClick={close} className={classes.close}>
              <CloseIcon />
            </ButtonWrapper>
          </div>

          <div className={classes.line}></div>

          <div className={classes.gridBox}>
            <div className={classes.item}>
              <div className={classes.name}>Transaction Ref</div>
              <div className={classes.value}>May 5, 2025</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Retries</div>
              <div className={classes.value}>0</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Delivery Time</div>
              <div className={classes.value}>May 08, 2025, 03:32:15 PM</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Status</div>
              <div className={classes.value}>
                <TableStatus status="success">Success</TableStatus>
              </div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>URL</div>
              <div className={classes.value}>
                https://api.example.com/webhooks/payments
              </div>
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
