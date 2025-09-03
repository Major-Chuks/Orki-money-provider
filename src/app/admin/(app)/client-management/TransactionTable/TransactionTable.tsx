import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import classes from "./TransactionTable.module.css";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { useState } from "react";
import { formatText, formatTxDate } from "@/services/utils";
import TableStatus from "@/components/app/TableStatus/TableStatus";
import { mockData } from "../mockData";

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
            <th>Client Name</th>
            <th>Client ID</th>
            <th>Signup Date</th>
            <th>Account Status</th>
            <th>KYB Status</th>
            <th>Current Plan</th>
            <th>Industry</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.clientName}</td>
              <td>{formatText(item.clientId, "clip", [5, 4])}</td>
              <td>{formatTxDate(item.signUpDate)}</td>
              <td>
                <TableStatus status={item.accountStatus.status}>
                  {item.accountStatus.status}
                </TableStatus>
              </td>
              <td>
                <TableStatus status={item.kybStatus}>
                  {item.kybStatus}
                </TableStatus>
              </td>
              <td>
                <TableStatus status={item.currentPlan}>
                  {item.currentPlan}
                </TableStatus>
              </td>
              <td>{item.industry}</td>
              <td>{item.country}</td>
              <td>
                <ButtonWrapper
                  onClick={() => setTxId("1")}
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
