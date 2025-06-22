import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";
import { get_apiLogs } from "@/types/apis/apiLogs/get_apiLogs";
import { formatTxDate } from "@/services/utils";

const TransactionTable = ({ data }: { data: get_apiLogs["logs"] }) => {
  return (
    <div className={classes.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>TIMESTAMP</th>
            <th>ENDPOINT</th>
            <th>METHOD</th>
            <th>STATUS CODE</th>
            <th>STATUS</th>
            <th>ENVIRONMENT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{formatTxDate(item.created_at)}</td>
              <td>{item.path}</td>
              <td>{item.method}</td>
              <td>{item.status_code}</td>
              <td>
                <TableStatus status={item.status}>{item.status}</TableStatus>
              </td>
              <td
              // className={classes[item.environment.toLowerCase()]}
              >
                {/* {item.environment} */}
                --
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
