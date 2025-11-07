import { HomeIcon, UserCog, User,  Calendar, Scale,BookOpenCheck} from "lucide-react";
import NavLinkComponent from "@/components/utilities-components/NavLinkComponent.js";

export default function Navegation() {
  return (
    <div className="space-y-1.5">
      <NavLinkComponent url="/dashboard" text="Citas programadas">
        <HomeIcon />
      </NavLinkComponent>
      <>
        <NavLinkComponent url="/user" text="Usuarios">
          <User />
        </NavLinkComponent>

        <NavLinkComponent url="/rol" text="Roles">
          <UserCog />
        </NavLinkComponent>
        <NavLinkComponent url="/appointments/create" text="Citas">
          < Calendar  />
        </NavLinkComponent>
        <NavLinkComponent url="/services" text="Servicios">
          < Scale   />
        </NavLinkComponent>
          <NavLinkComponent url="/categories" text="Categorías de Servicios">
          < BookOpenCheck    />
        </NavLinkComponent>
      </>
    </div>
  );
}
