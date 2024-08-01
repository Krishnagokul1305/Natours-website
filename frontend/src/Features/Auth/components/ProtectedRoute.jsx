import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom for navigation

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLogged } = useSelector((store) => store.user);
  useEffect(() => {
    if (!isLogged || !localStorage.getItem("token")) {
      navigate("/auth/login");
    }
  }, [isLogged, navigate]);

  return <>{children}</>;
}

export default ProtectedRoute;
