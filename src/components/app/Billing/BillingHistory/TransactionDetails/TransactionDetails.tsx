import Button from "@/components/CustomInput/Button/Button";
import TableStatus from "../TableStatus/TableStatus";
import classes from "./TransactionDetails.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import CloseIcon from "@/assets/app/CloseIcon";
import DownloadIcon from "@/assets/app/DownloadIcon";

const TransactionDetails = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={classes.modalLayout}>
      <div className={classes.modal}>
        <div className={classes.container}>
          <div className={classes.headerWrapper}>
            <div className={classes.header}>
              <div className={classes.title}>
                <div>Invoice INV-2023-001</div>{" "}
                <TableStatus status="success">Paid</TableStatus>
              </div>
              <div className={classes.description}>
                Invoice details for billing period May 5, 2025 - Jun 4, 2025
              </div>
            </div>

            <ButtonWrapper onClick={onClose} className={classes.close}>
              <CloseIcon />
            </ButtonWrapper>
          </div>

          <div className={classes.line}></div>

          <div className={classes.gridBox}>
            <div className={classes.item}>
              <div className={classes.name}>Invoice Date</div>
              <div className={classes.value}>May 5, 2025</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Due Date</div>
              <div className={classes.value}>May 12, 2025</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Billing Period</div>
              <div className={classes.value}>May 5, 2025 - Jun 4, 2025</div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Payment Method</div>
              <div className={classes.value}>Visa **** 4242</div>
            </div>
          </div>

          <div className={classes.line}></div>

          <div className={classes.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <div className={classes.subscriptionType}>Premium</div>
                      <div className={classes.subscriptionDuration}>
                        Monthly subscription
                      </div>
                    </div>
                  </td>

                  <td>1</td>
                  <td>$99.00</td>
                  <td>$99.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={classes.summary}>
            <div className={classes.flexBox}>
              <div className={classes.name}>Subtotal</div>
              <div className={classes.value}>$99.00</div>
            </div>
            <div className={classes.flexBox}>
              <div className={classes.name}>Taxes</div>
              <div className={classes.value}>$0.00</div>
            </div>
            <div className={classes.inline}></div>
            <div className={classes.flexBox}>
              <div className={classes.name}>Total</div>
              <div className={classes.value}>$99.00</div>
            </div>
          </div>

          <div className={classes.btnWrapper}>
            <Button
              variant="outlined"
              style={{ border: "2px solid #E5E7EB", color: "#6B7280" }}
              onClick={onClose}
            >
              Close
            </Button>
            <Button>
              <DownloadIcon /> Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
