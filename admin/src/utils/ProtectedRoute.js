import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkUserStatus } from "../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
const ProtectedRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserStatus());
  }, []);
  const {
    isLoading,
    isLoggedIn,
    error: reduxError,
  } = useSelector((state) => state.user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
