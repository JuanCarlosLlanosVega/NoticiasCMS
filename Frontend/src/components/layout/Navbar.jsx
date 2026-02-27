import { NavLink } from "react-router-dom";
import "../../styles/components/Navbar.css";

const navItems = [
  { label: "Institución", to: "/institucion" },
  { label: "Sede del Tribunal", to: "/sede-del-tribunal" },
  { label: "Tribunales Departamentales", to: "/tribunales" },
  { label: "Publicaciones", to: "/publicaciones" },
  { label: "Normas y Leyes", to: "/normas-y-leyes" },
  { label: "Biblioteca", to: "/biblioteca" },
  { label: "Sentencias CIDH", to: "/sentencias-cidh" },
  { label: "Contacto", to: "/contacto" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__bar">
          

          <div className="navbar__links" role="navigation" aria-label="Navegación principal">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}