import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
