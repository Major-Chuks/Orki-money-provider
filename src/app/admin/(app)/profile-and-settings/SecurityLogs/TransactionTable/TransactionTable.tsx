import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import { mockData } from "../mockData";

const TransactionTable = ({ data }: { data: typeof mockData }) => {
  return (
    <div className={classes.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>IP Address</th>
            <th>Location</th>
            <th>Device</th>
            <th>Timestamp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.activity}</td>
              <td>{item.ipAddress}</td>
              <td>{item.location}</td>
              <td>{item.device}</td>
              <td>{item.timeStamp}</td>
              <td>
                <TableStatus status={item.status}>{item.status}</TableStatus>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
