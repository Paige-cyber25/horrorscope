
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { api } from "@/utils/api"; 
import { ErrorResponse } from "@/utils/utils";

// --- Types for List Creation ---
interface CreateListPayload {
  name: string;
  description: string;
  isPublic: boolean;
  filmIds: string[]; // Array of IDs
}

interface CreateListResponse {
  success: boolean;
  message: string;
  data: unknown; // Structure of the created list object
}

export const useCreateListMutation = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  
  return useMutation<CreateListResponse, AxiosError, CreateListPayload>({
    mutationFn: async (payload: CreateListPayload) => {
      const { data } = await api.post("/lists", payload);
      return data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "List created successfully!");
      // Optionally invalidate a lists query key if you have a list of user lists
      queryClient.invalidateQueries({ queryKey: ['userLists'] });
      onSuccessCallback(); 
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || "Failed to create list.";
      toast.error(errorMessage);
    },
  });
};