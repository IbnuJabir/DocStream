import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkUserStatus } from "../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
const ProtectedRoute = () => {
  const {
    isLoading,
    isLoggedIn,
    error: reduxError,
  } = useSelector((state) => state.user);

  return(
    isLoading?(
      <div>Loading...</div>
    ):(
      isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
  ) 
};

export default ProtectedRoute;
