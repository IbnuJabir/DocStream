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
  IconButton,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DoctorsDialog from "./DoctorsDialog";
//Mock Data
import axios from "axios";
import DoctorDetails from "./DoctorDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../state/doctorSlice";
// import {}
const DoctorDataTable = () => {
  const dispatch = useDispatch();
  const { dialog } = useSelector((store) => store.dialog);
  const { doctors, isLoading, error } = useSelector((store) => store.doctors);
  const data = useMemo(() => doctors, [doctors]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [currentRow, setCurrentROw] = useState(null);
  const selectedRows = [];

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch, dialog, openDialog]);

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
        Cell: ({ renderedCellValue, row }) => {
          const [imageSrc, setImageSrc] = useState(null);
          // console.log(row.original.avatar);
          useEffect(() => {
            if (
              row.original.avatar &&
              row.original.avatar.data &&
              row.original.avatar.data.data
            ) {
              const blob = new Blob(
                [Int8Array.from(row.original.avatar.data.data)],
                {
                  type: row.original.avatar.contentType,
                }
              );
              const image = window.URL.createObjectURL(blob);
              setImageSrc(image);

              // Cleanup the object URL when the component unmounts or when the avatar data changes
              return () => {
                window.URL.revokeObjectURL(image);
              };
            }
          }, []);

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <IconButton>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                    alt="Avatar"
                  />
                )}
              </IconButton>
              {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
              <span>{renderedCellValue}</span>
            </Box>
          );
        },
      },
      {
        accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Email",
        size: 300,
      },
      {
        accessorKey: "phone", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Phone number",
        size: 300,
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
    enableRowActions: true,
    enableRowSelection: true,
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
      rowsPerPageOptions: [10, 20, 30, 50, 100],
      shape: "rounded",
      variant: "outlined",
    },
    renderDetailPanel: ({ row }) => <DoctorDetails row={row} />,
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <Button
          color="info"
          //   onClick={handleActivate}
          variant="contained"
        >
          Edit
        </Button>
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <Button
          color="error"
          onClick={() => {
            setCurrentROw(row.original);
            setOpenDialog(true);
          }}
          variant="contained"
        >
          Delete
        </Button>
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };
      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("contact " + row.getValue("name"));
        });
      };
      const handleDelete = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("Delete " + row.getValue("name"));
        });
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
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDelete}
                variant="contained"
              >
                Delete
              </Button>
            </Box>
          </Box>
          {openDialog && (
            <DoctorsDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              row={currentRow}
            />
          )}
        </Box>
      );
    },
  });
  if (isLoading) return <div>Loading ...</div>;
  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

const DoctorDataTableWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DoctorDataTable />
  </LocalizationProvider>
);

export default DoctorDataTableWithLocalizationProvider;
