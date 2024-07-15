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
  FormHelperText,
  FormLabel,
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
  openContactDialog,
  closeContactDialog,
} from "../../state/dialogSlice";
import { getAllDoctors } from "../../state/doctorSlice";
import { getAllAppointments } from "../../state/appointmentSlice";
import dayjs from "dayjs";
import { CircularProgress } from "@material-ui/core";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ content, selectedRows }) {
  const [appointmentTime, setAppointmentTime] = React.useState(null);
  const [doctorName, setDoctorName] = React.useState("");
  const [meetingLink, setMeetingLink] = React.useState("");
  const [contactMessage, setContactMessage] = React.useState("");
  const [docEmail, setDocEmail] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [currentAppointmentIndex, setCurrentAppointmentIndex] =
    React.useState(0);

  const { dialog, successDialog, cancelDialog, contactDialog } = useSelector(
    (store) => store.dialog
  );
  const { appointments } = useSelector((store) => store.appointment);
  const { doctors, isLoading, error } = useSelector((store) => store.doctors);

  const dispatch = useDispatch();

  const [errors, setErrors] = React.useState({
    doctorName: "",
    appointmentTime: "",
    meetingLink: "",
    contactMessage: "",
  });

  const filteredAppointments = appointments.filter((appointment) =>
    selectedRows.includes(appointment._id)
  );

  React.useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch, dialog, successDialog, cancelDialog]);
  // React.useEffect(() => {
  //   if (dialog || cancelDialog || contactDialog) {
  //     dispatch(closeSuccessDialog());
  //   }
  // }, [dispatch, dialog, successDialog, cancelDialog, contactDialog]);
  const handleApproval = async () => {
    const currentAppointment = filteredAppointments[currentAppointmentIndex];
    const formattedDate = dayjs(currentAppointment.selectedDate).format(
      "dddd, MMMM D, YYYY"
    );

    let newErrors = { doctorName: "", appointmentTime: "", meetingLink: "" };

    if (!doctorName) {
      newErrors.doctorName = "You must choose a doctor";
    }
    if (!appointmentTime) {
      newErrors.appointmentTime = "You have to choose appointment time";
    }
    if (!meetingLink) {
      newErrors.meetingLink = "Please add a meeting link";
    }
    if (
      newErrors.doctorName ||
      newErrors.appointmentTime ||
      newErrors.meetingLink
    ) {
      setErrors(newErrors);
      return; // Exit function if there are errors
    }

    const approvalData = {
      appointment: currentAppointment,
      appointmentDate: formattedDate,
      appointmentTime,
      doctorName,
      meetingLink,
      docEmail,
    };

    try {
      await axios.post(
        "http://localhost:4000/appointment/approve",
        approvalData
      );
      setAppointmentTime(null);
      setDoctorName("");
      setMeetingLink("");
      setSuccessMessage(
        "Appointment is successfully approved and the details sent to"
      );
      dispatch(openSuccessDialog());
    } catch (error) {
      console.error("Error while Approving the appointment:", error);
    }
  };

  const handleSuccessDialogClose = () => {
    dispatch(closeContactDialog());
    setCurrentAppointmentIndex((prevIndex) => prevIndex + 1);
    if (currentAppointmentIndex >= filteredAppointments.length) {
      dispatch(closeContactDialog());
      dispatch(closeDialog());
      dispatch(closeSuccessDialog());
    } else {
      dispatch(openContactDialog());
      dispatch(openDialog());
    }
  };

  const handleContactDialogClose = async () => {
    const currentAppointment = filteredAppointments[currentAppointmentIndex];
    let newError = { contactMessage: "" };
    if (!contactMessage) {
      newError.contactMessage = "Please drop a message first";
    }
    if (newError.contactMessage) {
      setErrors(newError);
      return;
    }
    const data = {
      currentAppointment,
      contactMessage,
    };
    try {
      await axios.post("http://localhost:4000/appointment/contact", data);
      setSuccessMessage("Your Message Successfully sent to ");
      setContactMessage("");
      dispatch(closeContactDialog());
      dispatch(openSuccessDialog());
    } catch (error) {
      console.error("Error while contacting the client:", error);
    }
  };

  const currentAppointment = filteredAppointments[currentAppointmentIndex];

  return (
    <>
      {currentAppointment && (
        <>
          <Dialog
            open={dialog && !successDialog && !cancelDialog & !contactDialog}
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
                <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                  <Box
                    component="span"
                    sx={{ color: "#159eec", fontWeight: "bold" }}
                  >
                    <FormLabel>Selected Date:</FormLabel>
                    {"  "}
                    {dayjs(currentAppointment.selectedDate).format(
                      "dddd, MMMM D, YYYY"
                    )}
                  </Box>{" "}
                  <Box>
                    <TimePicker
                      sx={{ width: "100%" }}
                      label="Appointment time"
                      onChange={(newValue) => setAppointmentTime(newValue)}
                    />
                    {errors.appointmentTime && (
                      <FormHelperText
                        sx={{ color: "#f44336", marginLeft: "14px" }}
                      >
                        {errors.appointmentTime}
                      </FormHelperText>
                    )}
                  </Box>
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
                          onClick={() => setDocEmail(row.email)}
                        >
                          {`Dr. ${row.firstName} ${row.lastName}`}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.doctorName && (
                      <FormHelperText
                        sx={{ color: "#f44336", marginLeft: "14px" }}
                      >
                        {errors.doctorName}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Meeting link"
                    onChange={(e) => setMeetingLink(e.target.value)}
                    value={meetingLink}
                    fullWidth
                    error={Boolean(errors.meetingLink)}
                    helperText={errors.meetingLink}
                  />
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  padding: "8px 16px",
                  backgroundColor: "#FF0000",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#CC0000" },
                }}
                onClick={() => dispatch(closeDialog())}
              >
                Cancel
              </Button>
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
            open={successDialog && !cancelDialog && !contactDialog && !dialog}
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
                  {successMessage} <br></br>
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
            open={cancelDialog && !contactDialog}
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
                      's Appointment is successfully suspended and email sent.
                    </span>
                  ) : (
                    "All selected Appointments successfully suspended and email sent to the client"
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

          <Dialog
            open={contactDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => dispatch(closeContactDialog())}
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
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Message"
                    onChange={(e) => setContactMessage(e.target.value)}
                    value={contactMessage}
                    fullWidth
                    error={Boolean(errors.contactMessage)}
                    helperText={errors.contactMessage}
                    multiline
                    rows={4} // Sets the minimum number of rows
                    inputProps={{ minLength: 20 }} // Sets the minimum number of characters (columns)
                  />
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  padding: "8px 16px",
                  backgroundColor: "#FF0000",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#CC0000" },
                }}
                onClick={() => dispatch(closeContactDialog())}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  padding: "8px 16px",
                  backgroundColor: "#159eec",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#127abb" },
                }}
                onClick={handleContactDialogClose}
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
