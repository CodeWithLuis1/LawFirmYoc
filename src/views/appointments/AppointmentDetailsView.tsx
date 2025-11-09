import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "@/api/AppointmentAPI.js";
import { getTasksByAppointment } from "@/api/TaskAPI.js";
import AddNoteModal from "@/components/noteModal/AddNoteModal.js";
import type { TaskFormData } from "@/schemas/types.js";

export default function AppointmentDetailsView() {
  const { appointmentId } = useParams();
  const id = Number(appointmentId);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => getAppointmentById(id),
    enabled: !isNaN(id),
  });

  const { data: tasks } = useQuery<TaskFormData[]>({
    queryKey: ["tasks", id],
    queryFn: () => getTasksByAppointment(id),
    enabled: !isNaN(id),
  });

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400"></div>
    </div>
  );
  
  if (isError) return <Navigate to="/404" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Botón Volver */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-black text-gray-800 bg-clip-text">
                {data.data.clientName}
              </h1>
              <p className="text-lg sm:text-xl font-light text-gray-500 mt-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {data.data.clientEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full sm:w-auto bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 px-8 py-4 text-white text-lg font-bold rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
            onClick={() => navigate(location.pathname + "?newTask=true")}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar Tarea
          </button>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Notas de la cita</h2>
          </div>

          {tasks && tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((t: TaskFormData) => (
                <li 
                  key={t.id} 
                  className="group bg-gradient-to-r from-gray-50 to-purple-50 hover:from-purple-50 hover:to-purple-100 p-6 rounded-xl border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-3">{t.description}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full shadow-sm transition-all duration-300 ${
                            t.status === "pendiente"
                              ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300"
                              : t.status === "completada"
                              ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                              : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${
                            t.status === "pendiente" ? "bg-yellow-500" :
                            t.status === "completada" ? "bg-green-500" : "bg-gray-500"
                          }`}></span>
                          {t.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">No hay notas registradas.</p>
              <p className="text-gray-400 text-sm mt-2">Comienza agregando una nueva tarea</p>
            </div>
          )}
        </div>
      </div>

      <AddNoteModal />
    </div>
  );
}