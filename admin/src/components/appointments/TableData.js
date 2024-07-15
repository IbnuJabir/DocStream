import { useEffect, useMemo, useState } from "react";

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";

//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { FaUserAlt } from "react-icons/fa";

//Mock Data
import AppointmentDetails from "./AppointmentDetail";
import axios from "axios";
import AlertDialogSlide from "./Dialog";

import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../../state/appointmentSlice";
import {
  openDialog,
  closeDialog,
  openSuccessDialog,
  closeSuccessDialog,
  openCancelDialog,
  closeCancelDialog,
  openContactDialog,
  closeContactDialog,
} from "../../state/dialogSlice";

const AppointmentDataTable = () => {
  const [dialogContent, setDialogContent] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const { appointments, isLoading, error } = useSelector(
    (store) => store.appointment
  );

  const { dialog, successDialog, cancelDialog, contactDialog } = useSelector(
    (store) => store.dialog
  );

  const data = useMemo(() => appointments, [appointments]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch, dialog, successDialog, cancelDialog]);

  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
        id: "name", //id is still required when using accessorFn instead of accessorKey
        header: "Name",
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <FaUserAlt />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Email",
        size: 300,
      },
      {
        accessorKey: "status",
        filterVariant: "autocomplete", //if not using filter modes feature, use this instead of filterFn
        header: "Status",
        size: 200,
        //custom conditional format and styling
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() === "suspended"
                  ? theme.palette.error.dark
                  : cell.getValue() === "paid"
                  ? theme.palette.warning.dark
                  : cell.getValue() === "booked"
                  ? theme.palette.success.dark
                  : cell.getValue() === "completed"
                  ? theme.palette.info.light
                  : cell.getValue() === "expired"
                  ? theme.palette.grey[500] // Gray background for expired
                  : theme.palette.warning.light,
              borderRadius: "0.5rem",
              color: "#fff",
              maxWidth: "12ch",
              padding: "0.25rem",
            })}
          >
            {cell.getValue()?.toLocaleString()}
          </Box>
        ),
      },
      {
        accessorFn: (row) => new Date(row.createdAt), //convert to Date for sorting and filtering
        id: "startDate",
        header: "Booked Date",
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableRowSelection: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
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
    renderDetailPanel: ({ row }) => <AppointmentDetails row={row} />,
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = async () => {
        table.getSelectedRowModel().flatRows.forEach((row) => {
          selectedRows.push(row.original._id);
        });
        try {
          const response = await axios.post(
            "http://localhost:4000/appointment/suspend",
            selectedRows
          );
          dispatch(openCancelDialog());
          // dispatch(openDialog());
        } catch (error) {
          console.error("Error while posting data:", error);
        }
      };

      const handleActivate = async () => {
        const selectedIds = table
          .getSelectedRowModel()
          .flatRows.map((row) => row.original._id);
        setSelectedRows(selectedIds);
        setDialogContent("Setup Appointment detail for");
        dispatch(openDialog());
      };
      const handleContact = () => {
        const selectedIds = table
          .getSelectedRowModel()
          .flatRows.map((row) => row.original._id);
        setSelectedRows(selectedIds);
        setDialogContent("Leave a message for");
        dispatch(openContactDialog());
      };

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button
                color="error"
                disabled={
                  !table.getIsSomeRowsSelected() ||
                  table
                    .getSelectedRowModel()
                    .flatRows.some((row) => row.getValue("status") !== "paid")
                }
                onClick={handleDeactivate}
                variant="contained"
              >
                Suspend
              </Button>

              <Button
                color="success"
                disabled={
                  !table.getIsSomeRowsSelected() ||
                  table
                    .getSelectedRowModel()
                    .flatRows.some((row) => row.getValue("status") !== "paid")
                }
                onClick={handleActivate}
                variant="contained"
              >
                Approve
              </Button>

              <Button
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button>
            </Box>
          </Box>
          {dialog || successDialog || cancelDialog || contactDialog ? (
            <AlertDialogSlide
              content={dialogContent}
              selectedRows={selectedRows}
            />
          ) : null}
        </Box>
      );
    },
  });
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div className="table-responsive">
          <MaterialReactTable table={table} />{" "}
        </div>
      )}
    </div>
  );
  // return <MaterialReactTable table={table} />;
};

const AppointmentDataTableWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <AppointmentDataTable />
  </LocalizationProvider>
);

export default AppointmentDataTableWithLocalizationProvider;
