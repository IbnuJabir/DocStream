import React, { useEffect, useState } from "react";
import {
  Navigate,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "./state/userSlice";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Navbar from "./pages/navbar/Navbar";
import Topmost from "./components/Topmost";
import Appointement from "./pages/appointment/Appointement";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import RootPage from "./pages/RootPage";
import "./App.css";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyAppointments from "./pages/appointment/MyAppointments";

function App() {
  // const [userEmail, setUserEmail] = useState("");
  const action = useNavigationType();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);



  useEffect(() => {
    dispatch(checkUserStatus());
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, location.pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (location.pathname) {
      case "/":
        title = "Home";
        metaDescription = "Welcome to Home page";
        break;
      case "/home":
        title = "Home";
        metaDescription = "Welcome to Home page";
        break;
      case "/appointment":
        title = "Appointment";
        metaDescription = "Welcome to Appointment page";
        break;
      case "/login":
        title = "Login";
        metaDescription = "Login to your account";
        break;
      case "/signup":
        title = "Signup";
        metaDescription = "Create a new account";
        break;
      // Add more cases for other routes if needed
      default:
        title = "DocStream";
        metaDescription = "DocStream description";
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
  }, [location.pathname]);

  return (
    <>
      {/* <Topmost /> */}
      <Navbar />
      {/* <RootPage /> */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/my-appointments"
            element={<MyAppointments />}
          />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/appointment" element={<Appointement />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
