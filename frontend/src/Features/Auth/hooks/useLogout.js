import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutService } from "../../../service/apiUser";

export function useLogout() {
  const queryClient = useQueryClient(); // Use the existing query client
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      queryClient.removeQueries("user");
    },
  });

  return { logout, isPending };
}
