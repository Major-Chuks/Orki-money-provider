import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import TableStatus from "../TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { useState } from "react";
import Overlay from "@/components/app/Overlay/Overlay";

const TransactionTable = ({
  data,
}: {
  data: {
    invoiceId: string;
    date: string;
    amount: string;
    status: "Paid" | "Refunded" | "Failed";
  }[];
}) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className={classes.tableWrapper}>
      {openDetails && (
        <Overlay>
          <TransactionDetails onClose={() => setOpenDetails(false)} />
        </Overlay>
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
              <td>{item.invoiceId}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>
                <TableStatus status={item.status}>{item.status}</TableStatus>
              </td>
              <td>
                <ButtonWrapper
                  onClick={() => setOpenDetails(true)}
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
