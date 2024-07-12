import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkUserStatus } from "../state/userSlice";
import { useDispatch, useSelector } from "react-redux";

const PublicRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserStatus());
  }, [dispatch]);

  const { isLoading, isLoggedIn } = useSelector((state) => state.user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
