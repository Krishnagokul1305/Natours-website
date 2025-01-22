import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUsers } from "../hooks/useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isError, isLoading, data } = useUsers();

  useEffect(() => {
    if (!isLoading && (!data || isError)) {
      navigate("/auth/login");
    }
  }, [isLoading, isError, navigate, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
