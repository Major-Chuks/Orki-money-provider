import TableStatus from "@/components/app/TableStatus/TableStatus";
import classes from "./TransactionTable.module.css";

const TransactionTable = ({
  data,
}: {
  data: {
    timeStamp: string;
    endpoint: string;
    method: string;
    statusCode: string;
    status: string;
    environment: "Test" | "Production";
  }[];
}) => {
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
              <td>{item.timeStamp}</td>
              <td>{item.endpoint}</td>
              <td>{item.method}</td>
              <td>
                <TableStatus status={"success"}>{item.statusCode}</TableStatus>
              </td>
              <td>
                <TableStatus status={item.status}>{item.status}</TableStatus>
              </td>
              <td className={classes[item.environment.toLowerCase()]}>
                {item.environment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
