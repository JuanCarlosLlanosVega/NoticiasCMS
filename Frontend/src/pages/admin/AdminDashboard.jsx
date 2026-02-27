import { useNavigate } from "react-router-dom";
import { getAdminSession, logoutAdmin } from "../../lib/auth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const session = getAdminSession();

  const salir = () => {
    logoutAdmin();
    navigate("/", { replace: true });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-black">Zona Privada (Admin)</h1>
          <p className="mt-1 text-sm text-slate-600">
            Bienvenido: <span className="font-bold">{session?.email || "admin"}</span>
          </p>
        </div>

        <button
          onClick={salir}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black hover:bg-slate-50"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Editar Logo</p>
          <p className="text-sm text-slate-600">Próximamente</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Carrusel</p>
          <p className="text-sm text-slate-600">Próximamente</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black">Enlaces / PDFs</p>
          <p className="text-sm text-slate-600">Próximamente</p>
        </div>
      </div>
    </div>
  );
}