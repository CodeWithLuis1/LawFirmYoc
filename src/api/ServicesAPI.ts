import api from "@/lib/axios.js";
import type { servicesFormData } from "@/schemas/types.js";
import { isAxiosError } from "axios";
import {getServicesSchema} from "@/schemas/types.js"

export async function CreateServiceAPI(formData: servicesFormData): Promise<string> {
  try {
    const { data } = await api.post("/services", formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error inesperado al crear el servicio");
    }
  }
}


export async function GetServiceAPI(page: number = 1) {
  try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/services", { params: { limit, page} });
    const response = getServicesSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw error;
    }
  }
}
