import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { checkUserStatus } from "../state/userSlice";
import { useDispatch, useSelector } from "react-redux";
const ProtectedRoute = () => {
  // const location = useLocation();
  // const pathname = location.pathname;

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(checkUserStatus());
  // }, [dispatch, pathname]);
  const {
    isLoading,
    isLoggedIn,
    error: reduxError,
  } = useSelector((state) => state.user);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
