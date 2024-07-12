import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText;
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import {
  Box,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { useDoctorsData } from "../../contexts/FetchDoctors";
// import { useAppointmentsData } from "../../contexts/FetchAppointment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  openDialog,
  closeDialog,
  openSuccessDialog,
  closeSuccessDialog,
  openCancelDialog,
  closeCancelDialog,
} from "../../state/dialogSlice";
import { getAllDoctors } from "../../state/doctorSlice";
import { getAllAppointments } from "../../state/appointmentSlice";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ content, selectedRows }) {
  const [appointmentDate, setAppointmentDate] = React.useState(null);
  const [appointmentTime, setAppointmentTime] = React.useState(null);
  const [doctorName, setDoctorName] = React.useState("");
  const [meetingLink, setMeetingLink] = React.useState("");
  const [currentAppointmentIndex, setCurrentAppointmentIndex] =
    React.useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);

  const { dialog, successDialog, cancelDialog } = useSelector(
    (store) => store.dialog
  );
  const { appointments } = useSelector((store) => store.appointment);
  const { doctors, isLoading, error } = useSelector((store) => store.doctors);

  const dispatch = useDispatch();

  console.log("dialog", dialog);

  const filteredAppointments = appointments.filter((appointment) =>
    selectedRows.includes(appointment._id)
  );

  const handleApproval = async () => {
    const currentAppointment = filteredAppointments[currentAppointmentIndex];
    const approvalData = {
      appointment: currentAppointment,
      appointmentDate,
      appointmentTime,
      doctorName,
      meetingLink,
    };

    try {
      await axios.post(
        "http://localhost:4000/appointment/approve",
        approvalData
      );
      setAppointmentDate(null);
      setAppointmentTime(null);
      setDoctorName("");
      setMeetingLink("");
      dispatch(openSuccessDialog());
    } catch (error) {
      console.error("Error while Approving the appointment:", error);
    }
  };

  const handleSuccessDialogClose = () => {
    dispatch(closeSuccessDialog());
    setCurrentAppointmentIndex((prevIndex) => prevIndex + 1);
    if (currentAppointmentIndex >= filteredAppointments.length - 1) {
      dispatch(closeDialog());
    } else dispatch(openDialog());
  };
  const handleCancelDialogClose = () => {
    dispatch(closeCancelDialog());
    setCurrentAppointmentIndex((prevIndex) => prevIndex + 1);
    if (currentAppointmentIndex < filteredAppointments.length - 1) {
      dispatch(openCancelDialog());
    }
  };

  const currentAppointment = filteredAppointments[currentAppointmentIndex];

  return (
    <>
      {currentAppointment && (
        <>
          <Dialog
            open={dialog && !successDialog && !cancelDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => dispatch(closeDialog())}
            aria-describedby="alert-dialog-slide-description"
            key={currentAppointment._id}
          >
            <DialogTitle>
              <Alert severity="info" sx={{ marginBottom: 4 }}>
                {content}{" "}
                <Box
                  component="span"
                  sx={{ color: "#159eec", fontWeight: "bold" }}
                >
                  {`${currentAppointment.firstName} ${currentAppointment.lastName}`}
                </Box>{" "}
              </Alert>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                sx={{ marginTop: 1 }}
              >
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Appointment date"
                      onChange={(newValue) => setAppointmentDate(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth sx={{ m: 1 }} />
                      )}
                      sx={{ width: "100%", m: 1 }}
                    />
                  </LocalizationProvider>
                  <TimePicker
                    sx={{ width: "100%" }}
                    label="Appointment time"
                    onChange={(newValue) => setAppointmentTime(newValue)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Doctor
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Doctor"
                      value={doctorName}
                      onChange={(event) => setDoctorName(event.target.value)}
                    >
                      {doctors.map((row) => (
                        <MenuItem
                          key={row._id}
                          value={`Dr. ${row.firstName} ${row.lastName}`}
                        >
                          {`Dr. ${row.firstName} ${row.lastName}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Meeting link"
                    onChange={(e) => setMeetingLink(e.target.value)}
                    value={meetingLink}
                    fullWidth
                  />
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  padding: "8px 16px",
                  backgroundColor: "#159eec",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#127abb" },
                }}
                onClick={handleApproval}
              >
                Approve and Send Email
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={successDialog && !cancelDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => dispatch(closeSuccessDialog())}
            aria-describedby="alert-dialog-slide-description"
            key={currentAppointment._id}
          >
            <DialogTitle sx={{ padding: 0 }}>
              <Alert
                severity="success"
                sx={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "top",
                }}
              >
                <DialogContentText
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "16px",
                  }}
                >
                  Appointment is successfully approved and the details sent to{" "}
                  <br></br>
                  <Box
                    component="span"
                    sx={{ color: "#159eec", fontWeight: "bold" }}
                  >
                    {`${currentAppointment.firstName} ${currentAppointment.lastName}`}
                  </Box>{" "}
                  via Email{" "}
                </DialogContentText>
                <DialogActions sx={{ padding: 0 }}>
                  <Button
                    onClick={handleSuccessDialogClose}
                    sx={{
                      padding: "8px 16px",
                      backgroundColor: "#159eec",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#127abb" },
                    }}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Alert>
            </DialogTitle>
          </Dialog>
          <Dialog
            open={cancelDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => dispatch(closeCancelDialog())}
            aria-describedby="alert-dialog-slide-description"
            key={currentAppointment._id}
          >
            <DialogTitle sx={{ padding: 0 }}>
              <Alert
                severity="error"
                sx={{
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "top",
                }}
              >
                <DialogContentText
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "16px",
                  }}
                >
                  {selectedRows.length === 1 ? (
                    <span>
                      <Box
                        component="span"
                        sx={{ color: "#159eec", fontWeight: "bold" }}
                      >
                        {`${currentAppointment.firstName} ${currentAppointment.lastName}`}
                      </Box>
                      's Appointment is successfully suspended
                    </span>
                  ) : (
                    "All selected Appointments successfully suspended"
                  )}
                </DialogContentText>

                <DialogActions sx={{ padding: 0 }}>
                  <Button
                    onClick={() => dispatch(closeCancelDialog())}
                    sx={{
                      padding: "8px 16px",
                      backgroundColor: "#159eec",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#127abb" },
                    }}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Alert>
            </DialogTitle>
          </Dialog>
        </>
      )}
    </>
  );
}
