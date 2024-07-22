import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LayersIcon from "@mui/icons-material/Layers";
import { FaCalendarAlt, FaMoneyCheckAlt, FaPowerOff } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { CgUnavailable, CgProfile } from "react-icons/cg";
import { FcDepartment } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/userSlice";
const MainListItems = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => goTo("/")}>
        <ListItemIcon>
          <DashboardIcon sx={{ fontSize: "22px" }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/appointments")}>
        <ListItemIcon>
          <FaCalendarAlt style={{ fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/doctors")}>
        <ListItemIcon>
          <FaUserDoctor style={{ fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/transactions")}>
        <ListItemIcon>
          <FaMoneyCheckAlt style={{ fontSize: "20px" }} />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/unavailabledates")}>
        <ListItemIcon>
          <CgUnavailable style={{ fontSize: "25px" }} />
        </ListItemIcon>
        <ListItemText primary="Unavailable dates" />
      </ListItemButton>
      <ListItemButton onClick={() => goTo("/departments")}>
        <ListItemIcon>
          <FcDepartment style={{ fontSize: "25px" }} />
        </ListItemIcon>
        <ListItemText primary="Departments" />
      </ListItemButton>
    </React.Fragment>
  );
};

export const mainListItems = <MainListItems />;

export const SecondaryListItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };
  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Successfully LoggedOut!");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <ListSubheader
        component="div"
        inset
        sx={{ backgroundColor: "#159eec", color: "#fff", marginTop: "115px" }}
      >
        Managements
      </ListSubheader>
      {/* <ListItemButton sx={{height: "40px"}} onClick={() => goTo("/admins")}>
         <ListItemIcon>
          <MdManageAccounts style={{ fontSize: "25px" }} />
        </ListItemIcon>
        <ListItemText primary="Admins" /> 
      </ListItemButton> */}
      {/* <ListItemButton>
         <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Unavailable dates" /> 
      </ListItemButton> */}
      {/* <ListItemButton onClick={() => goTo("/profile")}>
        <ListItemIcon>
          <CgProfile style={{ fontSize: "25px" }} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton> */}
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <FaPowerOff />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};
export const secondaryListItems = <SecondaryListItems />;
