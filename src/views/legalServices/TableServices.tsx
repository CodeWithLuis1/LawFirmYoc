import { Link } from "react-router-dom";
import PaginationComponent from "@/components/utilities-components/PaginationComponent.js"
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {GetServiceAPI} from "@/api/ServicesAPI.js"
import type { Service } from "@/schemas/types.js";


export default function TableService() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const { data, isLoading, isError } = useQuery({
    queryKey: ["services", currentPage, pageSize],
    queryFn: () => GetServiceAPI(currentPage),
  });

  const handlePageChange = (page: number) => setCurrentPage(page);
  if (isLoading) return <p>Cargando servicios...</p>;
  if (isError) return <p>Error al cargar los servicios.</p>;
  const services = data?.data || [];
  const totalPages = data?.lastPage || 1;

   if(data) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl w-full">
        <div className="table-container">
          <div className="table-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="table-title">Lista de servicios</h2>
            <Link to="/services/create" className="btn-primary whitespace-nowrap">
              Crear servicio
            </Link>
          </div>
          <div className="overflow-x-auto">
            {services.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Duración(Meses)</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service: Service) => (
                    <tr key={service.id_service}>
                      <td>{service.id_service}</td>
                      <td>{service.name}</td>
                      <td>{service.price}</td>
                      <td>{service.duration}</td>
                      <td>{service.description}</td>
                      <td>
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            service.status
                              ? "bg-green-100 text-green-700 border border-green-400"
                              : "bg-red-100 text-red-700 border border-red-400"
                          }`}
                        >
                          {service.status ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>{service.category?.name??"Sin categoría"}</td>
                      <td>
                        <div className="table-actions justify-center">
                          <button
                            className="btn-icon btn-icon-primary"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="btn-icon"
                            style={{
                              borderColor: "#dc2626",
                              color: "#dc2626",
                            }}
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-10 text-gray-500">
                No hay servicios registrados.
              </p>
            )}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
