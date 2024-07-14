import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGenderless,
  FaVideo,
  FaFileAlt,
} from "react-icons/fa";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    width: "60%",
    maxWidth: "600px",
    marginLeft: "10%",
    padding: theme.spacing(3),
    backgroundColor: "#f0f0f0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    backgroundColor: "#159eec",
    color: "#fff",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(4),
    alignItems: "flex-start",
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.5rem",
    color: "#159eec",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    flex: 1,
    color: "gray",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  ul: {
    paddingLeft: theme.spacing(2),
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: "50%",
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: "50%",
  },
}));

const AppointmentDetails = ({ row }) => {
  const classes = useStyles();
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        Appointment Detail
      </Typography>

      <Box className={classes.section}>
        <Box className={classes.leftSide}>
          <Box className={classes.details}>
            <Typography variant="h6" className={classes.title}>
              <FaUser className={classes.icon} />
              Full Name:
            </Typography>
            <Typography variant="body1">{`${row.original.firstName} ${row.original.lastName}`}</Typography>
          </Box>
          <Box className={classes.details}>
            <Typography variant="h6" className={classes.title}>
              <FaEnvelope className={classes.icon} />
              Email:
            </Typography>
            <Typography variant="body1">{row.original.email}</Typography>
          </Box>
          <Box className={classes.details}>
            <Typography variant="h6" className={classes.title}>
              <FaMapMarkerAlt className={classes.icon} />
              Address:
            </Typography>
            <Typography variant="body1">{row.original.address}</Typography>
          </Box>
          <Box className={classes.details}>
            <Typography variant="h6" className={classes.title}>
              <FaCalendarAlt className={classes.icon} />
              Date Of Birth:
            </Typography>
            <Typography variant="body1">
              {f.format(new Date(row.original.dateOfBirth))}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.rightSide}>
          <Box className={classes.details}>
            <Typography variant="h6" className={classes.title}>
              <FaGenderless className={classes.icon} />
              Gender:
            </Typography>
            <Typography variant="body1">{row.original.gender}</Typography>
          </Box>
          <Box className={classes.details}>
            <Typography variant="h6" className={classes.title}>
              <FaVideo className={classes.icon} />
              Meeting Platform:
            </Typography>
            <Typography variant="body1">
              {row.original.meetingPlatform}
            </Typography>
          </Box>
          <Box className={classes.details}>
            <Typography variant="h6" className={classes.title}>
              <FaFileAlt className={classes.icon} />
              Treatment:
            </Typography>
            <Typography variant="body1">{row.original.treatment}</Typography>
          </Box>
          <Box className={classes.details}>
            <Typography variant="h6" className={classes.title}>
              Transaction Ref:
            </Typography>
            <Typography variant="body1">{row.original.tx_ref}</Typography>
          </Box>
        </Box>
      </Box>

      <Box className={classes.details}>
        <Typography variant="h6" className={classes.title}>
          Selected Date:
        </Typography>
        <Typography variant="body1">{dayjs(row.original.selectedDate).format("dddd, MMMM D, YYYY")}</Typography>
      </Box>

      <Box className={classes.details}>
        <Typography variant="h6" className={classes.title}>
          Message:
        </Typography>
        <Typography variant="body1">{row.original.message}</Typography>
      </Box>
    </Box>
  );
};

export default AppointmentDetails;
