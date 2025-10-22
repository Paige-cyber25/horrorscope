import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { ApiResponse, ErrorResponse, SignupData, SignupPayload } from "@/utils/utils";
import { api } from "@/utils/api";

type SignupResponse = ApiResponse<SignupData>;

export const useSignupMutation = () => {
  return useMutation<SignupResponse, AxiosError, SignupPayload>({
    mutationFn: async (payload: SignupPayload) => {
      const { data } = await api.post("/auth/signup", payload);
      return data;
    },
    onSuccess: (data) => {
      // Store token in localStorage for axios interceptor
      localStorage.setItem("user", JSON.stringify({ token: data.data.accessToken }));
      toast.success("Signup successful! Welcome aboard.");
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as ErrorResponse)?.message  || "Signup failed. Please try again.";
      toast.error(errorMessage);
    },
  });

};