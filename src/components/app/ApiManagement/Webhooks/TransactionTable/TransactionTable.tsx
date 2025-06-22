import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { useState } from "react";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { get_webhookLogs } from "@/types/apis/webhook/get_webhookLogs";
import { formatText, formatTxDate } from "@/services/utils";
import { ExternalLink } from "lucide-react";

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
            <th>Attempts</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{formatText(item.id, "clip", [5, 4])}</td>
              <td>{formatText(item.event_type)}</td>
              <td>{formatTxDate(item.last_attempted_at)}</td>
              <td>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {formatText(item.url, "clipEnd", 18)}{" "}
                  <ExternalLink
                    style={{ marginBottom: "-2px" }}
                    width={16}
                    height={16}
                  />
                </a>
              </td>
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
