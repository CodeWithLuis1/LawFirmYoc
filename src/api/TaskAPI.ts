import api from "@/lib/axios.js";
import { isAxiosError } from "axios";
import type { TaskCreateData } from "@/schemas/types.js"; // Assuming you exported TaskCreateData

// Type for function parameters
type CreateTaskParams = {
  formData: TaskCreateData;
  appointmentId: number;
};

// Function to create a task
export async function createTask({
  formData,
  appointmentId,
}: CreateTaskParams): Promise<string> {
  try {
    // Use template literal to inject appointmentId dynamically in the URL
    const url = `/appointment/${appointmentId}/tasks`;
    const { data } = await api.post<string>(url, formData);
    
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error(error.message);
    }
    throw error;
  }
}
