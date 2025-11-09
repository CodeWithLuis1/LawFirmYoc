import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm.js";
import { useForm } from "react-hook-form";
import type { TaskCreateData } from "@/schemas/types.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/TaskAPI.js";
import { toast } from "react-toastify";

export default function AddNoteModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get("newTask"); // ✅ ahora usa newTask
  const show = !!modalTask;

  const { appointmentId } = useParams();
  const id = Number(appointmentId);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskCreateData>({
    defaultValues: { name: "", description: "", status: "pendiente" },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: TaskCreateData) => createTask({ formData, appointmentId: id }),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      navigate(location.pathname, { replace: true });
      reset();
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleCreateTask = (formData: TaskCreateData) => mutate(formData);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100" leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-16 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="font-black text-4xl mb-5">
                  Nueva Nota
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Llena el formulario para{" "}
                  <span className="text-fuchsia-600">registrar una nota</span>
                </p>

                <form onSubmit={handleSubmit(handleCreateTask)} className="mt-10 space-y-3">
                  <TaskForm register={register} errors={errors} />
                  <input
                    type="submit"
                    disabled={isPending}
                    value={isPending ? "Guardando..." : "Guardar Nota"}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors disabled:opacity-60"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
