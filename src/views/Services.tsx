import React, { useState } from "react";
import {
  Scale,
  Users,
  FileText,
  Heart,
  Building,
  Shield,
  Gavel,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getServices, deleteServices } from "@/api/AppointmentAPI.js";
import { toast } from "react-toastify";


const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["services1"],
    queryFn: getServices,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteServices,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Servicio eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["services1"] });
    },
  });
    if (isLoading) return "Loading...";

  // Datos de servicios jurídicos
  const services = [
    {
      id: 1,
      name: "Divorcios",
      category: "Familia",
      icon: Heart,
      price: "$2,500",
      duration: "3-6 meses",
      description: "Procesos de divorcio consensual y contencioso",
      cases: 45,
      status: "Activo",
    },
    {
      id: 2,
      name: "Apelaciones",
      category: "Procesal",
      icon: Scale,
      price: "$3,200",
      duration: "4-8 meses",
      description: "Recursos de apelación en todas las materias",
      cases: 23,
      status: "Activo",
    },
    {
      id: 3,
      name: "Derecho Laboral",
      category: "Laboral",
      icon: Users,
      price: "$1,800",
      duration: "2-4 meses",
      description: "Demandas laborales y conflictos empresariales",
      cases: 67,
      status: "Activo",
    },
  ];

  // Categorías para el filtro
  const categories = [
    "all",
    "Familia",
    "Procesal",
    "Laboral",
    "Mercantil",
    "Penal",
    "Público",
  ];

  // Filtrar servicios
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || service.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por categoría */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "Todas las categorías" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón agregar */}
            <Link
              className="bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-blue-700 hover:to-fuchsia-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              to="/services/create"
            >
              {/* <Plus className="h-5 w-5" /> */}
              Nuevo Servicio
            </Link>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header de la tabla */}
              <thead className="bg-gradient-to-r from-blue-900 to-fuchsia-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Servicio
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Precio</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Duración
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>

              {/* Body de la tabla */}
              <tbody className="divide-y divide-gray-200">
                {filteredServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <tr
                      key={service.id}
                      className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-fuchsia-50 transition-all duration-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {/* Servicio */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-br from-blue-500 to-fuchsia-500 p-3 rounded-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {service.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {service.description}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Categoría */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {service.category}
                        </span>
                      </td>

                      {/* Precio */}
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-green-600">
                          {service.price}
                        </span>
                      </td>

                      {/* Duración */}
                      <td className="px-6 py-4">
                        <span className="text-gray-600">
                          {service.duration}
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            service.status === "Activo"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              service.status === "Activo"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          ></div>
                          {service.status}
                        </span>
                      </td>

                      {/* Acciones */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-fuchsia-600 hover:bg-fuchsia-50 rounded-lg transition-colors duration-200">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer de la tabla */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando {filteredServices.length} de {services.length}{" "}
                servicios
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                  Anterior
                </button>
                <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                  1
                </span>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
