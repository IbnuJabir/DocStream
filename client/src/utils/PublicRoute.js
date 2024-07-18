import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.user);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
