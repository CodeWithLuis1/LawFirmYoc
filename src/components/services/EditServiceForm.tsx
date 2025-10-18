// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import ServiceForm, { ServiceFormData } from "@/components/services/ServiceForm.js";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateService } from "@/api/ServiceAPI.js"; // Debes crear esta función en tu API
// import { toast } from "react-toastify";

// type EditServiceFormProps = {
//   data: ServiceFormData;
//   serviceId: number;
// };

// export default function EditServiceForm({ data, serviceId }: EditServiceFormProps) {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { register, handleSubmit, formState: { errors } } = useForm<ServiceFormData>({
//     defaultValues: {
//       name: data.name,
//       category: data.category,
//       price: data.price,
//       duration: data.duration,
//       description: data.description,
//       cases: data.cases,
//       status: data.status,
//     },
//   });

//   const { mutate } = useMutation({
//     mutationFn: updateService,
//     onError: (error: any) => {
//       toast.error(error.message || "Error al actualizar el servicio");
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["services"] });
//       queryClient.invalidateQueries({ queryKey: ["editService", serviceId] });
//       toast.success("Servicio actualizado correctamente");
//       navigate("/services"); // Ajusta la ruta a tu listado de servicios
//     },
//   });

//   const handleForm = (formData: ServiceFormData) => {
//     mutate({ formData, serviceId });
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h1 className="text-5xl font-black">Editar Servicio</h1>
//       <p className="text-2xl font-light text-gray-500 mt-5">
//         Llena el siguiente formulario para editar el servicio
//       </p>

//       <nav className="my-5">
//         <Link
//           className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
//           to="/services"
//         >
//           Volver a servicios
//         </Link>
//       </nav>

//       <form
//         className="mt-10 bg-white shadow-lg p-10 rounded-lg"
//         onSubmit={handleSubmit(handleForm)}
//         noValidate
//       >
//         <ServiceForm register={register} errors={errors} />
//         <input
//           type="submit"
//           value="Guardar Cambios"
//           className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
//         />
//       </form>
//     </div>
//   );
// }
