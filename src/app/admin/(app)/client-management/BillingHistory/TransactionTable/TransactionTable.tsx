import classes from "./TransactionTable.module.css";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { useState } from "react";
import TableStatus from "@/components/app/TableStatus/TableStatus";
import { mockData } from "../mockData";
import DotsIcon from "@/assets/app/DotsIcon";

const TransactionTable = ({ data }: { data: typeof mockData }) => {
  const [txId, setTxId] = useState("");

  return (
    <div className={classes.tableWrapper}>
      {Boolean(txId) && (
        <TransactionDetails id={txId} onClose={() => setTxId("")} />
      )}
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Period</th>
            <th>Current Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.invoiceId}</td>
              <td>{item.date}</td>
              <td>{item.period}</td>
              <td>{item.currentPlan}</td>
              <td>{item.amount}</td>
              <td>
                <TableStatus status={item.status}>{item.status}</TableStatus>
              </td>
              <td>{item.paymentMethod}</td>

              <td>
                <DotsIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
