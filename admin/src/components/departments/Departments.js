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
  getAllDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../state/departmentSlice";

const Departments = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeData, setChangeData] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const { isLoading, departments, error } = useSelector(
    (store) => store.departments
  );
  const data = useMemo(() => departments, [departments]);

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch, changeData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
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
        },
      },
      {
        accessorKey: "head",
        header: "Head",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.head,
          helperText: validationErrors?.head,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              head: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  const validateName = (name) => !!name.length;
  const validateDescription = (description) => !!description.length;
  const validateHead = (head) => !!head.length;

  const validateDepartment = (dprt) => {
    return {
      name: !validateName(dprt.name) ? "Name is Required" : "",
      head: !validateHead(dprt.head) ? "Head is Required" : "",
      description: !validateDescription(dprt.description)
        ? "Description is Required"
        : "",
    };
  };

  // CREATE action
  const handleCreateDepartment = async ({ values, table }) => {
    const newValidationErrors = validateDepartment(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await dispatch(addDepartment(values));
    setChangeData((prev) => !prev);
    table.setCreatingRow(null); // exit creating mode
  };

  // UPDATE action
  const handleSaveDepartment = async ({ values, table }) => {
    const { name, description, head } = values;
    const data = {
      id: selectedRow.original._id,
      name,
      description,
      head,
    };
    await dispatch(updateDepartment(data));
    setChangeData((prev) => !prev); // Optionally trigger a change indicator
    table.setEditingRow(null); // Exit editing mode
  };

  // DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(deleteDepartment(row.original._id));
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
    onCreatingRowSave: handleCreateDepartment,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveDepartment,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setSelectedRow(row);
              table.setEditingRow(row);
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
        }}
      >
        Add Department
      </Button>
    ),
  });

  return (
    <>
      <h2 style={{ color: "#159eec" }}>Departments</h2>
      <MaterialReactTable table={table} />
    </>
  );
};

const queryClient = new QueryClient();

const DepartmentProviders = () => (
  <QueryClientProvider client={queryClient}>
    <Departments />
  </QueryClientProvider>
);

export default DepartmentProviders;
