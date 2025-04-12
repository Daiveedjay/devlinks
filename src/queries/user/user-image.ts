import { apiEndpoint } from "@/lib/constants";
import { ApiError, ApiResponse } from "../auth/types/types";
import { useMutation } from "@tanstack/react-query";

export const updateUserImage = async (
  file: File
): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${apiEndpoint}/avatar`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data: ApiResponse<string> = await response.json();

  if (!response.ok || data.error) {
    throw {
      status: response.status,
      message: data.message || "Failed to update image",
    } as ApiError;
  }

  return data;
};

export const useUpdateUserImage = () => {
  // const updateUser = useUserStore((store) => store.updateUser);
  return useMutation<ApiResponse<string>, ApiError, File>({
    mutationFn: (file: File) => updateUserImage(file),
  });
};
