import { number, string, z } from "zod";
import { paginationSchema } from "@/schemas/paginateSchemas.js";

export const appointmentSchema = z.object({
  id: z.number(),
  clientName: z.string(),
  clientEmail: z.string(),
  clientPhone: z.string(),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
  reason: z.string(),
});

export const dashboardAppointmentSchema = z.array(
  appointmentSchema.pick({
    id: true,
    clientName: true,
    clientEmail: true,
    clientPhone: true,
    appointmentDate: true,
    appointmentTime: true,
    reason: true,
  })
);
export type Appointment = z.infer<typeof appointmentSchema>;

export type AppointmentFormData = Pick<Appointment,"clientName" | "clientEmail" | "clientPhone" |"appointmentDate" |"appointmentTime" |"reason"
>;


//Tasks
// ✅ Enumeración de estados de tarea válidos (según backend)
export const taskStatusSchema = z.enum([
  "pendiente",
  "en_proceso",
  "completada",
  "cancelada",
  "retrasada",
]);

// ✅ Schema para crear una tarea (lo que se envía desde el frontend)
export const taskCreateSchema = z.object({
  name: z.string().min(3, "El nombre es obligatorio"),
  description: z.string().min(5, "La descripción es obligatoria"),
  status: taskStatusSchema.default("pendiente"),
});

// ✅ Schema para validar una tarea completa (lo que el backend retorna)
export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  status: taskStatusSchema,
  appointmentId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  appointment: z
    .object({
      id: z.number(),
      clientName: z.string(),
      clientEmail: z.string(),
      clientPhone: z.string(),
      appointmentDate: z.string(),
      appointmentTime: z.string(),
      reason: z.string(),
    })
    .optional(), // el backend puede o no incluirlo
});

//  Schema para validar una lista de tareas
export const getTasksSchema = z.object({
  data: z.array(taskSchema),
});

// Tipos derivados
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type TaskCreateData = z.infer<typeof taskCreateSchema>;

//services categories
export const servicesCategorySchema = z.object({
  id_category: z.number(),
  name: z.string(),
})
export const serviceCategoriesList=(
  servicesCategorySchema.pick({
    id_category:true,
    name:true,
  })
)
export const getCategoriesSchema = paginationSchema(serviceCategoriesList)
export type Category = z.infer<typeof servicesCategorySchema>;
export type ServiceCategoryFormData = Pick<Category, "id_category"|"name" >;

// Schema Services
export const ServicesSchema = z.object({
  id_service: z.number(),
  name: z.string(),
  id_category: z.number(),
  price: z.string().transform((val) => parseFloat(val)),
  duration: z.number(),
  description: z.string(),
  status: z.boolean(),
  category: servicesCategorySchema,
});

export const tableServicesSchema = ServicesSchema.pick({
  id_service: true,
  name: true,
  price: true,
  duration: true,
  description: true,
  status: true,
  category: true,
});
export const getServicesSchema = paginationSchema(tableServicesSchema);

// Tipos
export type GetServiceFormData = z.infer<typeof getServicesSchema>;
export type Service = z.infer<typeof ServicesSchema>;
export type servicesFormData = Pick<
  Service,
  "name" | "id_category" | "price" | "duration" | "description" | "status"
>;