import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import TableStatus from "../../TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { useState } from "react";
import { get_transactions } from "@/types/apis/transactions/get_transactions";
import { customToFixed, formatText, formatTxDate } from "@/services/utils";

const TransactionTable = ({
  data,
}: {
  data: get_transactions["transactions"];
}) => {
  const [txId, setTxId] = useState("");

  return (
    <div className={classes.tableWrapper}>
      {Boolean(txId) && (
        <TransactionDetails id={txId} onClose={() => setTxId("")} />
      )}
      <table>
        <thead>
          <tr>
            <th>Provider Txn ID</th>
            <th>Transaction ID</th>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Fiat Amount</th>
            <th>Crypto Amount</th>
            <th>Payment Method</th>
            <th>Provider</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{formatText(item.provider_tx_id || "--", "clip", [5, 4])}</td>
              <td>{formatText(item.id, "clip", [5, 4])}</td>
              <td>{formatTxDate(item.created_at)}</td>
              <td>{formatText(item.type)}</td>
              <td>
                {customToFixed(Number(item.fiat_amount), 6)}{" "}
                {item.fiat_currency}
              </td>
              <td>
                {customToFixed(Number(item.crypto_amount), 6)}{" "}
                {item.crypto_currency}
              </td>
              <td>{formatText(item.payment_method)}</td>
              <td>{formatText(item.provider)}</td>
              <td>
                <TableStatus status={item.status}>{item.status}</TableStatus>
              </td>
              <td>
                <ButtonWrapper
                  onClick={() => setTxId(item.id)}
                  className={classes.viewBtn}
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
