import ErrorMessage from "@/components/ErrorMessage.js";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Calendar, Clock, Mail, Phone, User } from "lucide-react";
import type { AppointmentFormData } from "@/schemas/types.js";

type AppointmentFormProps = {
  //We got register from createAppointmentsView
  register: UseFormRegister<AppointmentFormData>;
  errors: FieldErrors<AppointmentFormData>;
};

export default function AppointmentForm({register,errors,}: AppointmentFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label
          htmlFor="clientName"
          className="text-sm uppercase font-bold flex items-center gap-2"
        >
          <User className="w-4 h-4" /> Nombre del Cliente *
        </label>
        <input
          id="clientName"
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="Juan Pérez"
          {...register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres",
            },
            pattern: {
              value: /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/,
              message: "Solo letras y espacios permitidos",
            },
          })}
        />
        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="clientEmail"
          className="text-sm uppercase font-bold flex items-center gap-2"
        >
          <Mail className="w-4 h-4" /> Correo
        </label>

        <input
          id="clientEmail"
          className="w-full p-3 border border-gray-200"
          type="email"
          placeholder="cliente@correo.com"
          {...register("clientEmail", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Formato de correo no válido",
            },
          })}
        />
        {errors.clientEmail && (
          <ErrorMessage>{errors.clientEmail.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="clientPhone"
          className="text-sm uppercase font-bold flex items-center gap-2"
        >
          <Phone className="w-4 h-4" /> Teléfono
        </label>
        <input
          id="clientPhone"
          className="w-full p-3 border border-gray-200"
          type="tel"
          placeholder="502 5555 1234"
          {...register("clientPhone")}
        />
        {errors.clientPhone && (
          <ErrorMessage>{errors.clientPhone.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="appointmentDate"
          className="text-sm uppercase font-bold flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" /> Fecha de cita *
        </label>
        <input
          id="appointmentDate"
          className="w-full p-3 border border-gray-200"
          type="date"
          {...register("appointmentDate", {
            required: "La fecha es obligatoria",
          })}
        />
        {errors.appointmentDate && (
          <ErrorMessage>{errors.appointmentDate.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label
          htmlFor="appointmentTime"
          className="text-sm uppercase font-bold flex items-center gap-2"
        >
          <Clock className="w-4 h-4" /> Hora de cita *
        </label>
        <input
          id="startTime"
          className="w-full p-3 border border-gray-200"
          type="time"
          {...register("appointmentTime", {
            required: "La hora es obligatoria",
          })}
        />
        {errors.appointmentTime && (
          <ErrorMessage>{errors.appointmentTime.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="reason" className="text-sm uppercase font-bold">
          Motivo / Asunto *
        </label>
        <textarea
          id="reason"
          className="w-full p-3 border border-gray-200"
          rows={3}
          placeholder="Ej.: Asesoría corporativa"
          {...register("reason", {
            required: "El motivo es obligatorio",
          })}
        />
        {errors.reason && <ErrorMessage>{errors.reason.message}</ErrorMessage>}
      </div>
    </>
  );
}
