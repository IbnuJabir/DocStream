import { useEffect, useMemo } from "react";
import { getAllUnAvailableDates } from "../../state/unAvailableDatesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
// import { Box, Tooltip } from "@material-ui/core";
import { Box,Tooltip, Button } from "@mui/material";
// DELETE action
const openDeleteConfirmModal = (row) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    // Perform delete action here
  }
};

function UnAvailableDates() {
  const dispatch = useDispatch();
  const { isLoading, unAvailableDates, error } = useSelector(
    (store) => store.unAvailableDates
  );
  const data = useMemo(() => unAvailableDates, [unAvailableDates]);

  useEffect(() => {
    dispatch(getAllUnAvailableDates());
  }, [dispatch]);

  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });

  const handleEdit = (row) => {
    // Handle edit action here
    console.log("Edit:", row);
  };

  const handleDelete = (row) => {
    // Handle delete action here
    alert("Delete:", row);
  };

  const columns = useMemo(
    () => [
      {
        // accessorFn: (row) => {
        //   console.log("Formatting date:", row.date); // Debug log
        //   const date = new Date(row.date);
        //   console.log(isNaN(date) ? "Invalid Date" : f.format(date));
        //   return isNaN(date) ? "Invalid Date" : f.format(date);
        // },
        accessorKey: "date",
        header: "Date",
        size: 100,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 250,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    getRowId: (row) => row.id,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow({
            id: new Date().getTime().toString(), // Generate a unique ID for the new row
            date: new Date().now(), // Set the default date to the current date
            description: "", // Initialize other fields as needed
          });
        }}
      >
        ADD NEW UNAVAILABLE DATE
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
}

export default UnAvailableDates;
