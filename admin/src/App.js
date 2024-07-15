import React, { useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Appointments from "./components/appointments/Appointments";
import Doctors from "./components/doctors/Doctors";
import Transactions from "./components/transactions/Transactions";
import Admins from "./components/management/Admins";
import Login from "./components/login/Login";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import UnAvailableDates from "./components/UnavalableDates/UnavalableDates";
import Departments from "./components/departments/Departments";
import {
  DashboardContainer,
  Dashboard,
} from "./components/dashboard/Dashboard";
import "./global.css";
import { useNavigationType, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUserStatus } from "./state/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.user);

  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    dispatch(checkUserStatus());
  }, []);
  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);
  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
      case "/dashboard":
        title = "Dashboard | DocStream";
        metaDescription = "Welcome to the dashboard of DocStream.";
        break;
      case "/appointments":
        title = "Appointments | DocStream";
        metaDescription = "Manage your appointments in DocStream.";
        break;
      case "/doctors":
        title = "Doctors | DocStream";
        metaDescription = "Manage doctors in DocStream.";
        break;
      case "/transactions":
        title = "Transactions | DocStream";
        metaDescription = "View and manage transactions in DocStream.";
        break;
      case "/unavailabledates":
        title = "Unavailable Dates | DocStream";
        metaDescription = "Manage unavailable dates in DocStream.";
        break;
      case "/admins":
        title = "Admins | DocStream";
        metaDescription = "Manage admin users in DocStream.";
        break;
      case "/departments":
        title = "Departments | DocStream";
        metaDescription = "Manage departments in DocStream.";
        break;
      case "/login":
        title = "Login | DocStream";
        metaDescription = "Login to your DocStream account.";
        break;
      case "/signup":
        title = "Signup | DocStream";
        metaDescription = "Create a new DocStream account.";
        break;
      default:
        title = "DocStream";
        metaDescription =
          "Welcome to DocStream, your hospital management solution.";
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardContainer />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="unavailabledates" element={<UnAvailableDates />} />
            <Route path="admins" element={<Admins />} />
            <Route path="departments" element={<Departments />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
