import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import TableStatus from "../TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import Overlay from "../../Overlay/Overlay";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { useState } from "react";

const TransactionTable = ({
  data,
}: {
  data: {
    clientId: string;
    transactionId: string;
    date: string;
    type: "Buy" | "Sell";
    fiatAmount: string;
    cryptoAmount: string;
    paymentMethod: string;
    provider: string;
    status: "Success" | "Pending" | "Failed";
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
            <th>Client ID</th>
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
              <td>{item.clientId}</td>
              <td>{item.transactionId}</td>
              <td>{item.date}</td>
              <td>{item.type}</td>
              <td>{item.fiatAmount}</td>
              <td>{item.cryptoAmount}</td>
              <td>{item.paymentMethod}</td>
              <td>{item.provider}</td>
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
