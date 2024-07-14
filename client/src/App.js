import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RootPage from "./pages/RootPage";
import PageNotFound from "./pages/PageNotFound";
import UnAuthorizedAccess from "./pages/UnAuthorizedAccess";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "./global.css";
import Navbar from "./pages/NavBar";
// import Navbar from "./components/Navbar";
import Topmost from "./components/Topmost";
import PaymentSuccessTable from "./components/paymentSuccessTable";
import Appointement from "./pages/Appointement";
import PaymentSuccess from "./pages/PaymentSuccess";

import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
function App() {
  const navigate = useNavigate();

  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

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
        title = "";
        metaDescription = "";
        break;
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
  return (
    <>
        {/* <Navbar /> */}
        <Topmost />
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/appointment" element={<Appointement />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default App;
