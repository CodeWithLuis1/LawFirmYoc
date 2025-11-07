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

export type AppointmentFormData = Pick<
  Appointment,
  "clientName" | "clientEmail" | "clientPhone" |"appointmentDate" |"appointmentTime" |"reason"
>;

// Enum for task status
export const taskStatusSchema = z.enum([
  "pendiente",
  "en_proceso",
  "completada",
  "retrasada",
  "cancelada"
])

//Tasks
export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  appointmentId: z.number(),
  status: taskStatusSchema
})

// Schema for creating a task (appointmentId is in the URL, not in the body)
export const taskCreateSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: taskStatusSchema.optional().default("pendiente")
})

export type TaskFormData = z.infer<typeof taskSchema>
export type TaskCreateData = z.infer<typeof taskCreateSchema>

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
  category: servicesCategorySchema
});

export const tableServicesSchema = (
  ServicesSchema.pick({
  id: true,
  name: true,
  category: true,
  price: true,
  duration: true,
  description: true,
  status: true,
  })
);
export const getServicesSchema = paginationSchema(tableServicesSchema);
export type GetServiceFormData = z.infer<typeof getServicesSchema>;
export type Service = z.infer<typeof ServicesSchema>;
export type servicesFormData = Pick<Service,"name" | "id_category" | "price" |"duration" |"description" |"status">;