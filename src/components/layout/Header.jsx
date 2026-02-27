
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [openTopMenu, setOpenTopMenu] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-6">
        {/* fila superior */}
        <div className="flex items-center gap-3 py-3">
          {/* Logo */}
          <div className="shrink-0">
            {/* Puedes reemplazar por tu imagen: src/assets/logo.png */}
            <div className="h-10 w-10 rounded bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700">
              LOGO
            </div>
          </div>

          {/* Título */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-center text-base sm:text-lg md:text-xl font-extrabold tracking-wide">
              PORTAL JURÍDICO COCHABAMBA
            </h1>
            <div className="mt-1 h-[2px] w-full bg-slate-900/80" />
          </div>

          {/* Links derecha (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/quienes-somos" className="text-sm hover:underline">
              Quienes somos
            </Link>
            <Link to="/contactanos" className="text-sm hover:underline">
              Contáctanos
            </Link>

            <button
              type="button"
              onClick={() => setOpenTopMenu((v) => !v)}
              className="rounded-md border border-amber-400 bg-amber-100 px-4 py-1.5 text-sm font-semibold hover:bg-amber-200"
            >
              Menú
            </button>
          </div>

          {/* Mobile: botón menú */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setOpenTopMenu((v) => !v)}
              className="rounded-md border border-amber-400 bg-amber-100 px-3 py-1.5 text-sm font-semibold"
              aria-expanded={openTopMenu}
              aria-controls="topmenu"
            >
              Menú
            </button>
          </div>
        </div>

        {/* Dropdown (mobile) */}
        {openTopMenu && (
          <div
            id="topmenu"
            className="md:hidden pb-3 flex flex-col gap-2 border-t pt-3"
          >
            <Link to="/quienes-somos" className="text-sm hover:underline">
              Quienes somos
            </Link>
            <Link to="/contactanos" className="text-sm hover:underline">
              Contáctanos
            </Link>
            <Link to="/admin" className="text-sm font-semibold hover:underline">
              Ingresar como Administrador
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}