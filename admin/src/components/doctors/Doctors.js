import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import AddDoctor from "./AddDoctor";
import DoctorsData from "./DoctorsData";
import { openDialog } from "../../state/dialogSlice";
import { useDispatch } from "react-redux";
function Doctors() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    dispatch(openDialog());
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h2 style={{ color: "#159eec" }}>Doctors</h2>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
          Add a Doctor
        </Button>
      </Box>
      <AddDoctor />
      <DoctorsData />
    </>
  );
}

export default Doctors;
