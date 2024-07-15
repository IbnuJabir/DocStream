import React, { useEffect } from "react";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./pages/NavBar";
import Topmost from "./components/Topmost";
import Appointement from "./pages/Appointement";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import "./App.css";
import "./global.css";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkUserStatus());
  }, []);

  useEffect(() => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Topmost />
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/appointment" element={<Appointement />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
