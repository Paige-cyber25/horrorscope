import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { LoginPayload, LoginResponse, ErrorResponse } from "@/utils/utils";
import { api } from "@/utils/api";

export const useLoginMutation = () => {
    const router = useRouter();
    return useMutation<LoginResponse, AxiosError, LoginPayload>({
      mutationFn: async (payload: LoginPayload) => {
        const { data } = await api.post("/auth/login", payload);
        return data;
      },
      onSuccess: (response) => {
        if (response.success) {
          // Store full user data and token in localStorage
          localStorage.setItem("user", JSON.stringify(response.data));
          toast.success(response.message || "Login successful!");
          router.push("/home");
        }
      },
      onError: (error: AxiosError) => {
        const errorMessage = (error.response?.data as ErrorResponse)?.message || "Login failed. Please check your credentials.";
        toast.error(errorMessage);
      },
    });
  };