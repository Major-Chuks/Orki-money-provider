import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { useState } from "react";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { get_webhookLogs } from "@/types/apis/webhook/get_webhookLogs";

const TransactionTable = ({
  data,
}: {
  data: get_webhookLogs["webhook_logs"];
}) => {
  const [tx, setTx] = useState<get_webhookLogs["webhook_logs"][number] | null>(
    null
  );

  return (
    <div className={classes.tableWrapper}>
      {tx && <TransactionDetails data={tx} onClose={() => setTx(null)} />}
      <table>
        <thead>
          <tr>
            <th>Webhook ID</th>
            <th>Transaction Ref</th>
            <th>Delivery Time</th>
            <th>URL</th>
            <th>Retries</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.id}</td>
              <td>{item.event_type}</td>
              <td>{item.last_attempted_at}</td>
              <td>{item.url}</td>
              <td>{item.attempts}</td>
              <td>
                <TableStatus status={item.status.toLowerCase()}>
                  {item.status}
                </TableStatus>
              </td>
              <td>
                <ButtonWrapper
                  className={classes.viewBtn}
                  onClick={() => setTx(item)}
                >
                  View Details
                </ButtonWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
