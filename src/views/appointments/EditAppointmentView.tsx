import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "@/api/AppointmentAPI.js";
import EditAppointmentForm from "@/components/appointments/EditAppointmentForm.js";

export default function EditAppointment() {
  const { appointmentId } = useParams();
  const id = Number(appointmentId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editAppointment", id],
    queryFn: () => getAppointmentById(id),
    enabled: !isNaN(id),
    retry: 3,
  });

  if (isNaN(id)) return <Navigate to="/404" />;
  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;

  return data ? <EditAppointmentForm data={data.data} appointmentId={id} /> : null;
}
