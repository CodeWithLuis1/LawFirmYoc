import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { TaskCreateData } from "@/schemas/types.js";
import ErrorMessage from "@/components/ErrorMessage.js";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import {createTask} from "@/api/TaskAPI.js"
import {toast} from "react-toastify"
import { useParams } from "react-router-dom";

type TaskFormProps = {
    errors: FieldErrors<TaskCreateData>
    register: UseFormRegister<TaskCreateData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    const navegate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get("newTask");
    const show = modalTask? true : false;

    const params = useParams()
    const appointmentId = params.appointmentId!
    
    const inicialValues = {
    name: "",
    description: "",
    status: "pendiente",
    };

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues:inicialValues })

    const {mutate} = useMutation({
        mutationFn: createTask,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
        }
    })

    const handleCreateTask = (formData: TaskCreateData) => {
        const data = {
            formData,
            appointmentId:
        }
    }
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="name"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}