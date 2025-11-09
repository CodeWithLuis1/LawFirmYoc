// src/api/TaskAPI.ts
import api from "@/lib/axios.js";
import { isAxiosError } from "axios";
import type { TaskCreateData } from "@/schemas/types.js";

type CreateTaskParams = {
  formData: TaskCreateData;
  appointmentId: number;
};

// ✅ Crear una tarea asociada a una cita
export async function createTask({ formData, appointmentId }: CreateTaskParams) {
  try {
    const { data } = await api.post(`/appointment/${appointmentId}/tasks`, formData);

    // 🔍 Backend responde con { message, data }
    return {
      message: data.message || "Tarea creada correctamente",
      task: data.data,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al crear la tarea");
    }
    throw new Error("Error desconocido al crear la tarea");
  }
}

// ✅ Obtener todas las tareas asociadas a una cita
export async function getTasksByAppointment(appointmentId: number) {
  try {
    const { data } = await api.get(`/appointment/${appointmentId}/tasks`);
    // 🔍 Backend responde con { data: [...] }
    return data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener las tareas");
    }
    throw new Error("Error desconocido al obtener las tareas");
  }
}
