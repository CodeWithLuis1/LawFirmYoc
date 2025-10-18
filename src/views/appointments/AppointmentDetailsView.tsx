
import { Navigate,useNavigate,useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "@/api/AppointmentAPI.js";
import AddTaskModal from '../../components/noteModal/AddNoteModal.js'

export default function AppointmentDetailsView() {

  const navigate = useNavigate()

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
  if(data) return (
    <>
      <h1 className="text-5xl font-black">{data.data.clientName} </h1>
      <p className="text-2xl font-light text-gray-500 mt-5"> {data.data.clientEmail} </p>

      <button
        type="button"
        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
        onClick={()=> navigate (location.pathname + '?newAppointment=true')} //this newAppointment=true has be the same like we have on the AddTaskModal 
      >
        Agregar nota 
      </button>
      <AddTaskModal/>
      </>
  )
}
