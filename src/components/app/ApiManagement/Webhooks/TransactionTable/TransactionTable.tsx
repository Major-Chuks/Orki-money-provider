import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { useState } from "react";
import TransactionDetails from "../TransactionDetails/TransactionDetails";

const TransactionTable = ({
  data,
}: {
  data: {
    id: string;
    reference: string;
    url: string;
    retries: number;
    status: string;
    deliveryTime: string;
  }[];
}) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <div className={classes.tableWrapper}>
      {openDetails && (
        <TransactionDetails onClose={() => setOpenDetails(false)} />
      )}
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
              <td>{item.reference}</td>
              <td>{item.deliveryTime}</td>
              <td>{item.url}</td>
              <td>{item.retries}</td>
              <td>
                <TableStatus status={item.status.toLowerCase()}>
                  {item.status}
                </TableStatus>
              </td>
              <td>
                <ButtonWrapper
                  className={classes.viewBtn}
                  onClick={() => setOpenDetails(true)}
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
