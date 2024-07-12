import React, { forwardRef, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { IoMan } from "react-icons/io5";
import { IoIosWoman } from "react-icons/io";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiTelInput } from "mui-tel-input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  TextField,
  Button,
  Container,
  Stack,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
  FormHelperText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { RxAvatar } from "react-icons/rx";

import bkgImg from "../../assets/images/doc.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddAdmin({ open, handleClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    gender: "",
    address: "",
    avatar: "",
  });
  const classes = useStyles();

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = {};

    if (!firstName) {
      errors.firstName = "First Name is required";
    }
    if (!lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
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
    if (!avatar) {
      errors.avatar = "Admin's image is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return; // Exit function if there are errors
    }

    // Proceed with form submission if no errors
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("address", address);
    formData.append("avatar", avatar);

    // Handle form submission logic here
    setLoading(true);
    try {
      const result = await axios.post("/admin/addNew", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setGender("");
      setDateOfBirth(null);
      setAddress("");
      setAvatar(null);

      alert(" Admin added Successfully!");
      // handleClose();
    } catch (error) {
      console.error(error);
      alert("Error saving a Admin data");
    } finally {
      setLoading(false);
    }
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handlePhone = (newPhone) => {
    setPhone(newPhone);
  };

  const handleProfilePicture = (event) => {
    setAvatar(event.target.files[0]);
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ color: "#f1f1f1" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, color: "#f1f1f1" }}
            variant="h6"
            component="div"
          >
            REGISTER ADMIN
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          backgroundColor: "#f1f1f1",
          width: "100%",
          borderRadius: ".4rem",
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        <section
          className="left_side"
          style={{
            backgroundColor: "#f1f1f1",
            flex: 2.5,
            backgroundImage: `url(${bkgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></section>
        <form
          onSubmit={handleSubmit}
          action={<Link to="/login" />}
          style={{margin: "0 auto",alignContent:"center", justifyContent: "center",backgroundColor: "#fff", padding: "0 2rem" }}
        >
          <center>
            <h2 style={{ color: "#159eec" }}>REGISTER ADMIN</h2>
          </center>
          <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
            <TextField
              type="text"
              variant="outlined"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
              error={Boolean(errors.firstName)} // Boolean check to determine if there's an error
              helperText={errors.firstName} // Display the error message
            />
            <TextField
              type="text"
              variant="outlined"
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
            <TextField
              type="email"
              variant="outlined"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
            <MuiTelInput
              fullWidth
              label="Phone"
              value={phone}
              defaultCountry="ET"
              onChange={handlePhone}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              error={Boolean(errors.address)}
              helperText={errors.address}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{ width: "100%" }}>
                <DatePicker
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(newValue) => setDateOfBirth(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={Boolean(errors.dateOfBirth)}
                      helperText={errors.dateOfBirth}
                      sx={{ mb: 1 }}
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <FormHelperText sx={{ color: "#f44336", marginLeft: "14px" }}>
                    {errors.dateOfBirth}
                  </FormHelperText>
                )}
              </div>
            </LocalizationProvider>
            <FormControl
              sx={{
                m: 1,
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ m: 1, mb: 0, width: "100%" }}
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
          </Stack>
          <Stack spacing={2} direction="row" sx={{ width: "fit-container%" }}>
            <div
              className={classes.root}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                // cursor: "pointer"
              }}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleProfilePicture}
              />
              <label
                htmlFor="contained-button-file"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: ".4rem",
                  width: "100%",
                }}
              >
                <RxAvatar style={{ fontSize: "40px", pointer: "cursor" }} />
                <Button variant="contained" color="primary" component="span">
                  Upload Photo
                </Button>
              </label>
              {errors.avatar && (
                <FormHelperText sx={{ color: "#f44336", marginLeft: "14px" }}>
                  {errors.avatar}
                </FormHelperText>
              )}
            </div>
          </Stack>
          <div>
            {loading ? (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <Button
                sx={{
                    width: "450px",
                  mb: 4,
                  backgroundColor: "#159eec",
                  color: "#fff",
                  padding: ".5rem",
                  "&:hover": { backgroundColor: "#127abb" },
                }}
                variant="outlined"
                type="submit"
              >
                Register
              </Button>
            )}
          </div>
        </form>
      </div>
    </Dialog>
  );
}

export default AddAdmin;
