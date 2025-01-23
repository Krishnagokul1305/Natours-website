import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutService } from "../../../service/apiUser";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient(); // Use the existing query client
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      queryClient.removeQueries("user");
      navigate("/auth/login");
    },
  });

  return { logout, isPending };
}
