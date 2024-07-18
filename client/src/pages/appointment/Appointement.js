import React, { useState, Fragment } from "react";
import "./appointment.css";
import axios from "axios";
import { IoMan } from "react-icons/io5";
import { IoIosWoman } from "react-icons/io";
import { MuiTelInput } from "mui-tel-input";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import AppointmentScheduler from "./AppoinmentScheduler";
function Appointement() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState("");
  const [treatment, setTreatment] = useState("");
  const [platform, setPlatform] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    gender: "",
    address: "",
    docDepartment: "",
    avatar: "",
  });

  const treatments = [
    "General Medical Checkup",
    "Follow-up Appointments",
    "Prescription Refills",
    "Mental Health Counseling",
    "Nutritional Counseling",
    "Chronic Disease Management (e.g., Diabetes, Hypertension)",
    "Cold and Flu Symptoms",
    "Allergy Treatment",
    "Skin Conditions (e.g., Rashes, Acne)",
    "Asthma Management",
    "Minor Infections (e.g., Urinary Tract Infections)",
    "Pain Management",
    "Post-surgical Follow-up",
    "Sleep Disorders",
    "Pediatric Consultations",
    "Smoking Cessation Counseling",
    "Weight Loss and Obesity Management",
    "Birth Control Counseling",
    "Menopause Management",
    "Sports Injuries",
    "Gastrointestinal Issues (e.g., Heartburn, Constipation)",
    "Physical Therapy Guidance",
    "Dermatological Consultations",
    "Travel Health Advice",
    "Medication Management",
  ];

  const theme = useTheme();

  const handlePhone = (newPhone) => {
    setPhone(newPhone);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    if (!fname) {
      errors.firstName = "First Name is required";
    }
    if (!lname) {
      errors.lastName = "Last Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!phone) {
      errors.phone = "Phone number is required";
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return; // Exit function if there are errors
    }
    const data = {
      firstName: fname,
      lastName: lname,
      email,
      phone,
      gender,
      dateOfBirth,
      address,
      treatment,
      meetingPlatform: platform,
      selectedDate,
      message,
    };
    setLoading(true);
    try {
      const appointmentResult = await axios.post("/appointment/addNew", data);
      console.log(appointmentResult.data);

      const res = await axios.post(
        "/payment/createpayment",
        appointmentResult.data
      );

      window.location.href = res.data.checkout_url;
    } catch (error) {
      console.error(error);
      alert("Error saving appointment");
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <div className="appointment_container">
      <div className="left_Container">
        <section className="left_side">
          <p>BOOK YOUR </p>
          <p>APPOINTMENT </p>
          <p>HERE ...</p>
        </section>
      </div>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 1 }}>
            <TextField
              type="text"
              variant="outlined"
              label="First Name"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
              fullWidth
              error={Boolean(errors.firstName)} // Boolean check to determine if there's an error
              helperText={errors.firstName} // Display the error message
            />
            <TextField
              type="text"
              variant="outlined"
              label="Last Name"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
              fullWidth
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginBottom: 1, width: "100%" }}
          >
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <MuiTelInput
              label="Phone"
              value={phone}
              defaultCountry="ET"
              required
              onChange={handlePhone}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginBottom: 1, width: "100%" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                onChange={(newValue) => setDateOfBirth(newValue)}
                required
              />
            </LocalizationProvider>

            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              // required
              error={Boolean(errors.address)}
              helperText={errors.address}
            />
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginBottom: 1, width: "100%" }}
          >
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={
                    <span>
                      <IoIosWoman /> Female
                    </span>
                  }
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={
                    <span>
                      <IoMan /> Male
                    </span>
                  }
                />
              </RadioGroup>
              {errors.gender && (
                <FormHelperText sx={{ color: "#f44336" }}>
                  {errors.gender}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Choose a video call platform
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handlePlatformChange}
              >
                <FormControlLabel
                  value="Google Meet"
                  control={<Radio />}
                  label={
                    <span>
                      <img
                        src="/google.png"
                        alt=""
                        style={{
                          verticalAlign: "middle",
                          marginRight: 4,
                        }}
                      />
                      Google{" "}
                    </span>
                  }
                />
                <FormControlLabel
                  value="Zoom"
                  control={<Radio />}
                  label={
                    <span>
                      <img
                        src="/zoom.webp"
                        alt=""
                        style={{
                          verticalAlign: "middle",
                          marginRight: 4,
                          color: "green",
                        }}
                      />
                      Zoom{" "}
                    </span>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack
            spacing={2}
            direction="column"
            sx={{ marginBottom: 1, width: "100%" }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Treatment type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Treatment type"
                value={treatment}
                onChange={(event) => setTreatment(event.target.value)}
              >
                {treatments.map((row) => (
                  <MenuItem key={row} value={row}>
                    {row}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <AppointmentScheduler
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Stack>
          <textarea
            id="textArea"
            rows="10"
            placeholder="put your message here ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", resize: "vertical" }}
          />

          <div>
            {loading ? (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                  style={{ width: "100%" }}
                  className="btn-primary"
                  type="submit"
                >
                  Book
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Appointement;
