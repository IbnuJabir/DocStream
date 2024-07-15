import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
