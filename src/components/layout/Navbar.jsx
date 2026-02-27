

import { NavLink } from "react-router-dom";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-700 text-white">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-6">
        {/* barra */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-semibold md:hidden">Navegación</span>

          <button
            type="button"
            className="md:hidden rounded border border-white/30 px-3 py-1 text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="navmenu"
          >
            {open ? "Cerrar" : "Abrir"}
          </button>

          {/* Desktop */}
          <div className="hidden md:flex w-full items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "whitespace-nowrap px-3 py-2 text-sm font-medium hover:bg-slate-600",
                    isActive ? "bg-slate-600" : "",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div id="navmenu" className="md:hidden pb-3">
            <div className="flex flex-col border-t border-white/15 pt-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "px-2 py-2 text-sm hover:bg-slate-600 rounded",
                      isActive ? "bg-slate-600" : "",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}