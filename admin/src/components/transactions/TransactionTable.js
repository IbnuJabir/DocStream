import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
//   import { data } from './makeData';
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../state/transactionSlice";
const columnHelper = createMRTColumnHelper();

const f = new Intl.DateTimeFormat("en-us", {
  dateStyle: "short",
  timeStyle: "short",
});

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const TableData = () => {
  const { transactions, isLoading, error } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();
  const data = useMemo(() => transactions, [transactions]);
  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);
  const columns = useMemo(() => [
    {
      accessorKey: "fname",
      header: "First Name",
      size: 220,
    },
    {
      accessorKey: "lname",
      header: "Last Name",
      size: 220,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      size: 220,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableClickToCopy: true,
      size: 220,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      size: 220,
    },
    {
      accessorKey: "currency",
      header: "Currency",
      size: 220,
    },
    {
      accessorKey: "tx_ref",
      header: "Transaction Ref",
      enableClickToCopy: true,
      size: 220,
    },
    {
      accessorFn: (row) => new Date(row.createdAt), //convert to Date for sorting and filtering
      id: "createdAt",
      header: "Payment Date",
      filterVariant: "date",
      filterFn: "lessThan",
      sortingFn: "datetime",
      Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
      Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
      muiFilterTextFieldProps: {
        sx: {
          minWidth: "250px",
        },
      },
    },
  ]);

  const handleExportPdfRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => [
      row.fname,
      row.lname,
      row.phone,
      row.email,
      row.amount,
      row.currency,
      row.tx_ref,
      f.format(new Date(row.updatedAt)),
    ]);
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("DocStream-Transaction-Data.pdf");
  };
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableRowNumbers: true,
    enableRowVirtualization: true,
    state: { isLoading: isLoading },
    muiCircularProgressProps: {
      color: "primary",
      thickness: 5,
      size: 55,
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 28,
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={() => handleExportPdfRows(data)}
          startIcon={<FileDownloadIcon />}
        >
          Export PDF
        </Button>
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data(CSV)
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows(CSV)
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows(CSV)
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows(CSV)
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default TableData;
