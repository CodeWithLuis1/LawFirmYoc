import ErrorMessage from "@/components/ErrorMessage.js";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { servicesFormData, Category } from "@/schemas/types.js";
import { useEffect, useState } from "react";
import { getCategoriesAPI } from "@/api/ServiceCategory.js";

type ServiceFormProps = {
  register: UseFormRegister<servicesFormData>;
  errors: FieldErrors<servicesFormData>;
};

export default function ServiceForm({ register, errors }: ServiceFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesAPI(); // ✅ tu función ya devuelve los datos validados
        setCategories(data?.data || []);        // data.data = array de categorías
      } catch (error) {
        console.error("❌ Error cargando las categorías:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {/* Nombre del servicio */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Nombre del Servicio *</label>
        <input
          className="w-full p-3 border border-gray-200 rounded"
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
          className="w-full p-3 border border-gray-200 rounded"
          {...register("id_category", {
            required: "La categoría es obligatoria",
            valueAsNumber: true, // ✅ convierte a número antes de enviar
          })}
          disabled={loadingCategories}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id_category} value={cat.id_category}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.id_category && <ErrorMessage>{errors.id_category.message}</ErrorMessage>}
      </div>

      {/* Precio */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Precio *</label>
        <input
          className="w-full p-3 border border-gray-200 rounded"
          type="number"
          step="0.01"
          placeholder="2500.00"
          {...register("price", {
            required: "El precio es obligatorio",
            valueAsNumber: true,
          })}
        />
        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
      </div>

      {/* Duración */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Duración (semanas) *</label>
        <input
          className="w-full p-3 border border-gray-200 rounded"
          type="number"
          placeholder="120"
          {...register("duration", {
            required: "La duración es obligatoria",
            valueAsNumber: true,
          })}
        />
        {errors.duration && <ErrorMessage>{errors.duration.message}</ErrorMessage>}
      </div>

      {/* Descripción */}
      <div className="mb-5 space-y-3">
        <label className="text-sm uppercase font-bold">Descripción *</label>
        <textarea
          className="w-full p-3 border border-gray-200 rounded"
          rows={3}
          placeholder="Incluye revisión, redacción y validación legal..."
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
          className="w-full p-3 border border-gray-200 rounded"
          {...register("status", {
            required: "El estado es obligatorio",
            setValueAs: (value) => value === "true", // ✅ convierte a booleano
          })}
        >
          <option value="">Seleccione un estado</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        {errors.status && <ErrorMessage>{errors.status.message}</ErrorMessage>}
      </div>
    </>
  );
}
