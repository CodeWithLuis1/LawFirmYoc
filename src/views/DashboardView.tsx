import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment, getAppointment } from "@/api/AppointmentAPI.js";
import { toast } from "react-toastify";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

export default function DashboardView() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["appointment1"],
    queryFn: getAppointment,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteAppointment,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Cita eliminada correctamente");
      queryClient.invalidateQueries({ queryKey: ["appointment1"] });
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );

  if (data)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-800">
                  Mis Citas
                </h1>
                <p className="text-lg sm:text-xl font-light text-gray-500 mt-1">
                  Manejo y administración de citas
                </p>
              </div>
            </div>

            <nav className="mt-6">
              <Link
                to="/appointments/create"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-8 py-4 text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Nueva Cita
              </Link>
            </nav>
          </div>

          {/* Appointments */}
          {data.length ? (
            <div className="grid gap-6">
              {data.map((appointment, index) => {
                const isPurple = index % 2 === 0;

                return (
                  <div
                    key={appointment.id}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 overflow-visible relative ${
                      isPurple ? "border-purple-100" : "border-blue-100"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-6 p-4 sm:p-8 mb-5rem">
                      {/* Información principal */}
                      <div className="flex gap-6 flex-1 flex-wrap">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                            isPurple
                              ? "bg-gradient-to-br from-purple-400 to-purple-600"
                              : "bg-gradient-to-br from-blue-500 to-blue-700"
                          }`}
                        >
                          <span className="text-2xl font-bold text-white">
                            {appointment.clientName
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>

                        <div className="flex-1 space-y-3 min-w-[200px]">
                          <Link
                            to={`/appointments/${appointment.id}`}
                            className={`block text-2xl sm:text-3xl font-bold hover:underline ${
                              isPurple
                                ? "text-purple-700 hover:text-purple-900"
                                : "text-blue-700 hover:text-blue-900"
                            }`}
                          >
                            {appointment.clientName}
                          </Link>

                          <div className="grid sm:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-gray-600">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm font-medium break-all">
                                {appointment.clientEmail}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              <span className="text-sm font-medium">
                                {appointment.clientPhone}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm font-medium">
                                {appointment.appointmentDate}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-sm font-medium">
                                {appointment.appointmentTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Menú de opciones */}
                      <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors">
                            <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button
                          className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                            isPurple
                              ? "text-purple-600 hover:bg-purple-50"
                              : "text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          <EllipsisVerticalIcon className="h-7 w-7" aria-hidden="true" />
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-300"
                          enterFrom="opacity-0 -translate-x-full"
                          enterTo="opacity-100 translate-x-0"
                          leave="transition ease-in duration-200"
                          leaveFrom="opacity-100 translate-x-0"
                          leaveTo="opacity-0 -translate-x-full"
                        >
                          <Menu.Items
                            className="
                              fixed top-0 left-0 z-[9999] h-full w-64
                              bg-white shadow-2xl ring-1 ring-black ring-opacity-5
                              flex flex-col divide-y divide-gray-200 p-4
                            "
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/appointments/${appointment.id}`}
                                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                                    active ? "bg-purple-50 text-purple-700" : "text-gray-900"
                                  }`}
                                >
                                  👁️ Ver cita
                                </Link>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/appointments/${appointment.id}/edit`}
                                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                                    active ? "bg-blue-50 text-blue-700" : "text-gray-900"
                                  }`}
                                >
                                  ✏️ Editar cita
                                </Link>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="button"
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left ${
                                    active ? "bg-red-50 text-red-700" : "text-red-600"
                                  }`}
                                  onClick={() => mutate(appointment.id)}
                                >
                                  🗑️ Eliminar cita
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-2 border-dashed border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-xl text-gray-600 mb-2">
                No hay citas programadas
              </p>
              <Link
                to="/appointments/create"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Crear tu primera cita
              </Link>
            </div>
          )}
        </div>
      </div>
    );
}
