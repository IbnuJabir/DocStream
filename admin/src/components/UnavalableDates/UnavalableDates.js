import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUnAvailableDates,
  addUnAvailableDates,
  updateUnAvailableDates,
  deleteUnAvailableDates,
} from "../../state/unAvailableDatesSlice";

const UnAvalableDates = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [formValues, setFormValues] = useState({ date: "", description: "" });
  const [changeData, setChangeData] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const { isLoading, unAvailableDates, error } = useSelector(
    (store) => store.unAvailableDates
  );
  const data = useMemo(() => unAvailableDates, [unAvailableDates]);

  useEffect(() => {
    dispatch(getAllUnAvailableDates());
  }, [dispatch, changeData]);

  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => new Date(row.date), //convert to Date for sorting and filtering
        id: "date",
        header: "Date",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          return date instanceof Date && !isNaN(date)
            ? date.toLocaleDateString()
            : "Invalid Date";
        }, //render Date as a string
        Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
        muiFilterTextFieldProps: {
          sx: {
            minWidth: "250px",
          },
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.date,
          helperText: validationErrors?.date,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              date: undefined,
            }),
          value: formValues.date,
          onChange: (e) => {
            setFormValues((prev) => ({ ...prev, date: e.target.value }));
          },
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
          value: formValues.description,
          onChange: (e) => {
            setFormValues((prev) => ({ ...prev, description: e.target.value }));
          },
        },
      },
    ],
    [validationErrors, formValues]
  );

  const validateDate = (date) => !!date.length;
  const validateDescription = (description) => !!description.length;

  const validateUser = (user) => {
    return {
      date: !validateDate(user.date) ? "Date must be DD/MM/YYYY" : "",
      description: !validateDescription(user.description)
        ? "Description is Required"
        : "",
    };
  };

  // CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await dispatch(addUnAvailableDates(values));
    setChangeData((prev) => !prev);
    table.setCreatingRow(null); // exit creating mode
    setFormValues({ date: "", description: "" }); // reset form values
  };

  // UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const { date, description } = values;
    const data = {
      id: selectedRow.id,
      date,
      description,
    };
    await dispatch(updateUnAvailableDates(data));
    setChangeData((prev) => !prev); // Optionally trigger a change indicator
    table.setEditingRow(null); // Exit editing mode
    setFormValues({ date: "", description: "" }); // reset form values
  };

  // DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this date?")) {
      dispatch(deleteUnAvailableDates(row.original._id));
      setChangeData((prev) => !prev);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row._id,
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
    muiToolbarAlertBannerProps: error
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setSelectedRow(row);
              table.setEditingRow(row);
              setFormValues({
                date: row.original.date || "",
                description: row.original.description || "",
              });
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
          setFormValues({ date: "", description: "" }); // reset form values for new row
        }}
      >
        Add Unavailable Date
      </Button>
    ),
  });

  return (
    <>
      <h2 style={{ color: "#159eec" }}>Unavalable Dates</h2>
      <MaterialReactTable table={table} />
    </>
  );
};

const queryClient = new QueryClient();

const DateProviders = () => (
  <QueryClientProvider client={queryClient}>
    <UnAvalableDates />
  </QueryClientProvider>
);

export default DateProviders;
