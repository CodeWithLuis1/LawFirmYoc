import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TaskCreateData } from "@/schemas/types.js";
import ErrorMessage from "@/components/ErrorMessage.js";

type TaskFormProps = {
  register: UseFormRegister<TaskCreateData>;
  errors: FieldErrors<TaskCreateData>;
};

export default function TaskForm({ register, errors }: TaskFormProps) {
  return (
    <>
      {/* Nombre de la tarea */}
      <div className="mb-5 space-y-3">
        <label
          htmlFor="name"
          className="text-sm uppercase font-bold"
        >
          Nombre de la tarea *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Ej.: Confirmar asistencia del cliente"
          className="w-full p-3 border border-gray-200"
          {...register("name", {
            required: "El nombre de la tarea es obligatorio",
            minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Descripción */}
      <div className="mb-5 space-y-3">
        <label
          htmlFor="description"
          className="text-sm uppercase font-bold"
        >
          Descripción *
        </label>
        <textarea
          id="description"
          placeholder="Ej.: Llamar un día antes para confirmar la cita"
          className="w-full p-3 border border-gray-200"
          rows={3}
          {...register("description", {
            required: "La descripción de la tarea es obligatoria",
          })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>

      {/* Estado */}
      <div className="mb-5 space-y-3">
        <label
          htmlFor="status"
          className="text-sm uppercase font-bold"
        >
          Estado *
        </label>
        <select
          id="status"
          className="w-full p-3 border border-gray-200"
          {...register("status")}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="completada">Completada</option>
          <option value="retrasada">Retrasada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>
    </>
  );
}
