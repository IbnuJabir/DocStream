import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.user);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
