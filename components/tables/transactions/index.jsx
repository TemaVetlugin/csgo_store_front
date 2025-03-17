import { DataTable } from "./data-table";

export const TransactionsTable = ({ data = [], columns = [] }) => {
  return <DataTable columns={columns} data={data} />;
};
