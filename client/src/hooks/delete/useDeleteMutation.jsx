import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const useDeleteMutation = (id, entity = "user", queryKey = "user") => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userInfo: {user}, isLoggedIn } = useSelector((state) => state.user);

  // Construct the API endpoint dynamically
  const endpoint = id ? `/${entity}/delete/${id}` : `/${entity}`;

  // Determine the redirect path based on the user's role
  const getRedirectPath = (user) => {
    if (!user) return "/login";
    return user.role === "admin" ? "/admin" : "/user";
  };

  return useMutation({
    mutationFn: () => makeRequest(endpoint, "DELETE"),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the specified query cache
      queryClient.invalidateQueries([queryKey]);

      // Clear localStorage if the user is a "user" or "vendor"
      if (user?.role === "user" || user?.role === "vendor") {
        localStorage.removeItem("userInfo");
      }

      // Navigate to the appropriate path
      setTimeout(() => {
        navigate(getRedirectPath(user));
      }, 0);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to delete. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export default useDeleteMutation;
