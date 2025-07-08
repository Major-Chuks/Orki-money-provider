import Button from "@/components/CustomInput/Button/Button";
import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionDetails.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import CloseIcon from "@/assets/app/CloseIcon";
import DownloadIcon from "@/assets/app/DownloadIcon";
import { get_listBillingHistory } from "@/types/apis/billing/get_listBillingHistory";
import { formatText, formatTxDate, getCurrencySymbol } from "@/services/utils";
import Drawer from "@/components/app/Drawer/Drawer";

const TransactionDetails = ({
  onClose,
  data,
}: {
  onClose: () => void;
  data: get_listBillingHistory["data"][number];
}) => {
  const handleDownloadPdf = () => {
    window.open(data.download_url, "_blank");
  };
  return (
    <Drawer onClose={onClose}>
      {({ close }) => (
        <div className={classes.container}>
          <div className={classes.headerWrapper}>
            <div className={classes.header}>
              <div className={classes.title}>
                <div>Invoice {formatText(data.id, "clip", [5, 4])} </div>{" "}
                <TableStatus status={data.status}>{data.status}</TableStatus>
              </div>
              <div className={classes.description}>
                Invoice details for billing period{" "}
                {formatTxDate(data.billing_period_start, false)} -{" "}
                {formatTxDate(data.billing_period_end, false)}
              </div>
            </div>

            <ButtonWrapper onClick={close} className={classes.close}>
              <CloseIcon />
            </ButtonWrapper>
          </div>

          <div className={classes.line}></div>

          <div className={classes.gridBox}>
            <div className={classes.item}>
              <div className={classes.name}>Invoice Date</div>
              <div className={classes.value}>
                {formatTxDate(data.invoice_date, false)}
              </div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Due Date</div>
              <div className={classes.value}>
                {formatTxDate(data.due_date, false)}
              </div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Billing Period</div>
              <div className={classes.value}>
                {formatTxDate(data.billing_period_start, false)} -{" "}
                {formatTxDate(data.billing_period_end, false)}
              </div>
            </div>

            <div className={classes.item}>
              <div className={classes.name}>Payment Method</div>
              <div className={classes.value}>
                {data.payment_method?.brand} ****{" "}
                {data.payment_method?.last_four}
              </div>
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
                {data.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div>
                        <div className={classes.subscriptionType}>
                          {item.description}
                        </div>
                        {/* <div className={classes.subscriptionDuration}>
                          Monthly subscription
                        </div> */}
                      </div>
                    </td>

                    <td>{item.quantity}</td>
                    <td>
                      {getCurrencySymbol(data.currency)}
                      {item.unit_price}
                    </td>
                    <td>
                      {getCurrencySymbol(data.currency)}
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={classes.summary}>
            <div className={classes.flexBox}>
              <div className={classes.name}>Subtotal</div>
              <div className={classes.value}>
                {getCurrencySymbol(data.currency)}
                {data.subtotal}
              </div>
            </div>
            <div className={classes.flexBox}>
              <div className={classes.name}>Taxes</div>
              <div className={classes.value}>
                {getCurrencySymbol(data.currency)}
                {data.tax}
              </div>
            </div>
            <div className={classes.inline}></div>
            <div className={classes.flexBox}>
              <div className={classes.name}>Total</div>
              <div className={classes.value}>
                {getCurrencySymbol(data.currency)}
                {data.total}
              </div>
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
            <Button onClick={handleDownloadPdf}>
              <DownloadIcon /> Download PDF
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default TransactionDetails;
