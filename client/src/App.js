import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RootPage from "./pages/RootPage";
import PageNotFound from "./pages/PageNotFound";
import UnAuthorizedAccess from "./pages/UnAuthorizedAccess";
import ProtectedRoute from "./utils/ProtectedRoute";
// import { AuthProvider } from "./context/AuthContext";
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
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "./state/userSlice";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  let pathname = location.pathname;
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserStatus());
  }, [dispatch, pathname]);

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
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <Navbar /> */}
      <Topmost />
      <Navbar />
      <Routes>
        {isLoggedIn && (
          <>
            {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/appointment" element={<Appointement />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
            {/* </Route> */}
          </>
        )}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
