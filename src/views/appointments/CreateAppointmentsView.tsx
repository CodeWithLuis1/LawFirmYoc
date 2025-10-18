import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AppointmentForm from "@/components/appointments/AppointmentForm.js";
import type { AppointmentFormData } from "@/schemas/types.js";
import { createAppointment } from "@/api/AppointmentAPI.js";
import { useMutation } from "@tanstack/react-query";

export default function CreateAppointmentsView() {
  const navigate = useNavigate();
  const initialValues: AppointmentFormData = {
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  };
  const {register,handleSubmit, formState: { errors }, } = useForm<AppointmentFormData>({ defaultValues: initialValues,  mode: "onChange", });

  const { mutate } = useMutation({
    mutationFn: createAppointment,
    onError: (error) => {
      toast.error(error.message);
    }, //this error comes from the api
    onSuccess: (response) => {
      toast.success(response);
      navigate("/"); //This will redirect to the home page after creating the appointment
    },
  });

  const handleForm = async (data: AppointmentFormData) => mutate(data);
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear citas</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear una nueva cita
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Volver a citas
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <AppointmentForm
            register={register} //we get register and errors from line 19 and 23
            errors={errors}
          />
          <input
            type="submit"
            value="Crear cita"
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
