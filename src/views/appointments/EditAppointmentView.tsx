import { Navigate,useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "@/api/AppointmentAPI.js";
import EditAppointmentForm from "@/components/appointments/EditAppointmentForm.js";

export default function EditAppointment() {

  const params = useParams();
  const { appointmentId } = useParams<{ appointmentId: string }>();
  // Aseguramos que siempre sea número válido
  const id = Number(appointmentId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editAppointment", appointmentId],
    queryFn: () => getAppointmentById(id),
    enabled: !isNaN(id),
    retry: 3 //This will retry 3 times to get the data and if it fails it will show the error message.
  });

  if (isLoading) return 'Cargando...';
  if (isError) return <Navigate to='/404'/>;
  if(data) return <EditAppointmentForm  data={data.data} appointmentId = {appointmentId} />
}
