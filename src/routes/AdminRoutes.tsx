import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout.js";
import { Spinner } from "@/components/utilities-components/Spinner.js";

const routes = [
  // ======== Panel principal ========
  {
    path: "/",
    component: lazy(() => import("@/views/DashboardView.js")),
    roles: [],
  },

  // ======== Gestión de Roles ========
  {
    path: "/rol",
    component: lazy(() => import("@/views/adminPanel/TableRoleView.js")),
    roles: [],
  },
  {
    path: "/rol/create",
    component: lazy(() => import("@/views/adminPanel/CreateRol.js")),
    roles: [],
  },
  {
    path: "/rol/edit/:id", // 
    component: lazy(() => import("@/views/adminPanel/EditRolView.js")),
    roles: [],
  },

  // ======== Gestión de Usuarios ========
  {
    path: "/user",
    component: lazy(() => import("@/views/adminPanel/TableUserView.js")),
    roles: [],
  },
  {
    path: "/user/create", // corregido: apuntar a la vista, no al componente
    component: lazy(() => import("@/views/adminPanel/CreateUserView.js")),
    roles: [],
  },

  // ======== Gestión de Citas ========
  {
    path: "/appointments/create",
    component: lazy(() => import("@/views/appointments/CreateAppointmentsView.js")),
    roles: [],
  },
  {
    path: "/appointments/:appointmentId",
    component: lazy(() => import("@/views/appointments/AppointmentDetailsView.js")),
    roles: [],
  },
  {
    path: "/appointments/:appointmentId/edit",
    component: lazy(() => import("@/views/appointments/EditAppointmentView.js")),
    roles: [],
  },

  // ======== Gestión de Productos ========
  {
    path: "/services",
    component: lazy(() => import("@/views/Services.js")),
    roles: [],
  },
  {
    path: "/services/create",
    component: lazy(() => import("@/views/legalServices/CreateServicesView.js")),
    roles: [],
  },
];

export default function AdminRoutes() {
  return (
    <Route element={<AppLayout />}>
      {routes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Spinner />}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Route>
  );
}



