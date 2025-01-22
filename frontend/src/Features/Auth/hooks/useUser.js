import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../service/apiUser";

export function useUsers() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });
  console.log(data);
  return { data, isError, isLoading };
}
