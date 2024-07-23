import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { isLoading, isLoggedIn } = useSelector((state) => state.user);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
