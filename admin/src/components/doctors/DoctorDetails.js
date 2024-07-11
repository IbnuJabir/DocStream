import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGenderless,
  FaPhoneAlt,
} from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    // borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: "8px 16px",
    // borderRadius: '8px 8px 0 0',
    textAlign: "center",
  },
  mainSection: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    marginTop: "16px",
  },
  leftSection: {
    flex: "1",
    overflow: "hidden",
    // borderRadius: '8px 0 0 8px',
  },
  rightSection: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  detail: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "gray",
    textWrap: "nowrap",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  profileImg: {
    width: "100%",
    minWidth: "200px",
    height: "100%",
    objectFit: "cover",
    borderRadius: "0 0 0 8px",
  },
  detailTitle: {
    minWidth: "100px",
    color: theme.palette.primary.main,
  },
}));

const DoctorDetails = ({ row }) => {
  const classes = useStyles();
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        Doctor's Detail
      </Typography>
      <Box className={classes.mainSection}>
        <Box className={classes.leftSection}>
          <img
            src={
              row.original.avatar
                ? URL.createObjectURL(
                    new Blob([Int8Array.from(row.original.avatar.data.data)], {
                      type: row.original.avatar.contentType,
                    })
                  )
                : "default-avatar.png"
            }
            alt="Doctor's image"
            className={classes.profileImg}
          />
        </Box>
        <Box className={classes.rightSection}>
          <Box className={classes.detail}>
            <FaUser className={classes.icon} />
            <Typography variant="h6" className={classes.detailTitle}>
              Full Name:
            </Typography>
            <Typography variant="body1">{`${row.original.firstName} ${row.original.lastName}`}</Typography>
          </Box>
          <Box className={classes.detail}>
            <FaPhoneAlt className={classes.icon} />
            <Typography variant="h6" className={classes.detailTitle}>
              Phone Number:
            </Typography>
            <Typography variant="body1">{row.original.phone}</Typography>
          </Box>
          <Box className={classes.detail}>
            <FaEnvelope className={classes.icon} />
            <Typography variant="h6" className={classes.detailTitle}>
              Email:
            </Typography>
            <Typography variant="body1">{row.original.email}</Typography>
          </Box>
          <Box className={classes.detail}>
            <FaMapMarkerAlt className={classes.icon} />
            <Typography variant="h6" className={classes.detailTitle}>
              Address:
            </Typography>
            <Typography variant="body1">{row.original.address}</Typography>
          </Box>
          <Box className={classes.detail}>
            <FaGenderless className={classes.icon} />
            <Typography variant="h6" className={classes.detailTitle}>
              Gender:
            </Typography>
            <Typography variant="body1">{row.original.gender}</Typography>
          </Box>
          <Box className={classes.detail}>
            <FaCalendarAlt className={classes.icon} />
            <Typography variant="h6" className={classes.detailTitle}>
              Date Of Birth:
            </Typography>
            <Typography variant="body1">
              {f.format(new Date(row.original.dateOfBirth))}
            </Typography>
          </Box>
          <Box className={classes.detail}>
            <FcDepartment className={classes.icon}/>
            <Typography variant="h6" className={classes.detailTitle}>
              Department:
            </Typography>
            <Typography variant="body1">
              {row.original.docDepartment}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDetails;
