import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddAdmin from "./AddAdmin.js";
import UnAvailableDates from "./UnAvailableDates.js";
import EditableTable from "./EditableDate.js";
export default function Admins() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
     <h2 style={{ color: "#159eec" }}>Admins</h2>
      <Box>
        <Button
          sx={{
            padding: "8px 16px",
            backgroundColor: "#159eec",
            color: "#fff",
            "&:hover": { backgroundColor: "#127abb" },
          }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add Admin
        </Button>
      </Box>
      <AddAdmin open={open} handleClose={handleClose} />
      {/* <UnAvailableDates /> */}
      {/* <EditableTable /> */}
    </>
  );
}
