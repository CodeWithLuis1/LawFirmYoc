import { string, z } from "zod";

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

// Schema Services
export const ServicesSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  price: z.string(),
  duration: string(),
  description: string(),
  status: string()
});

export const tableServicesSchema = z.array(
  appointmentSchema.pick({
  id: true,
  name: true,
  category: true,
  price: true,
  duration: true,
  description: true,
  status: true,
  })
);
export type Service = z.infer<typeof ServicesSchema>;
export type servicesFormData = Pick<
  Service,
  "name" | "category" | "price" |"duration" |"description" |"status"
>;
//NoteModal


// Enum for task status
export const taskStatusSchema = z.enum([
  "pendiente",
  "en_proceso",
  "completada",
  "retrasada",
  "cancelada"
])

//Tasks
// Full schema representing a task in the database or API response
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

// TypeScript types
export type TaskFormData = z.infer<typeof taskSchema>
export type TaskCreateData = z.infer<typeof taskCreateSchema>
