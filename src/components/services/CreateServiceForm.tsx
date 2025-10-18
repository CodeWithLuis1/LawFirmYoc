import ErrorMessage from "@/components/ErrorMessage.js";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type {servicesFormData} from "@/schemas/types.js";


type ServiceFormProps = {
  register: UseFormRegister<servicesFormData>;
  errors: FieldErrors<servicesFormData>;
};

export default function ServiceForm({ register, errors }: ServiceFormProps) {
  return (
    <>
      {/* Nombre del servicio */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Nombre del Servicio *</label>
        <input
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="Ej.: Divorcios"
          {...register("name", {
            required: "El nombre del servicio es obligatorio",
            minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      {/* Categoría */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Categoría *</label>
        <select
          className="w-full p-3 border border-gray-200"
          {...register("category", {
            required: "La categoría es obligatoria",
          })}
        >
          <option value="">Seleccione una categoría</option>
          <option value="Familia">Familia</option>
          <option value="Procesal">Procesal</option>
          <option value="Laboral">Laboral</option>
          <option value="Mercantil">Mercantil</option>
          <option value="Penal">Penal</option>
          <option value="Público">Público</option>
        </select>
        {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
      </div>

      {/* Precio */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Precio *</label>
        <input
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="$2,500"
          {...register("price", {
            required: "El precio es obligatorio",
          })}
        />
        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
      </div>

      {/* Duración */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Duración *</label>
        <input
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="3-6 meses"
          {...register("duration", {
            required: "La duración es obligatoria",
          })}
        />
        {errors.duration && <ErrorMessage>{errors.duration.message}</ErrorMessage>}
      </div>

      {/* Descripción */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Descripción *</label>
        <textarea
          className="w-full p-3 border border-gray-200"
          rows={3}
          placeholder="Procesos de divorcio consensual y contencioso"
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>

      {/* Estado */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Estado *</label>
        <select
          className="w-full p-3 border border-gray-200"
          {...register("status", {
            required: "El estado es obligatorio",
          })}
        >
          <option value="">Seleccione un estado</option>
          <option value="Activo">Activo</option>
          <option value="Pausado">Pausado</option>
        </select>
        {errors.status && <ErrorMessage>{errors.status.message}</ErrorMessage>}
      </div>
    </>
  );
}
