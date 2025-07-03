import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { useState } from "react";
import { get_listBillingHistory } from "@/types/apis/billing/get_listBillingHistory";
import { formatText, formatTxDate } from "@/services/utils";

const TransactionTable = ({
  data,
}: {
  data: get_listBillingHistory["data"];
}) => {
  const [txnDetails, setTxnDetails] = useState<
    get_listBillingHistory["data"][number] | null
  >(null);

  return (
    <div className={classes.tableWrapper}>
      {txnDetails && (
        <TransactionDetails
          data={txnDetails}
          onClose={() => setTxnDetails(null)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Date & Time</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{formatText(item.id, "clip", [5, 4])}</td>
              <td>{formatTxDate(item.due_date)}</td>
              <td>{item.total}</td>
              <td>
                <TableStatus status={item.status}>{item.status}</TableStatus>
              </td>
              <td>
                <ButtonWrapper
                  onClick={() => setTxnDetails(item)}
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
