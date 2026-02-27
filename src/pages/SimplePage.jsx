
import { Link } from "react-router-dom";

export default function SimplePage({ title }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">
        Esta es una página pública placeholder. Luego la conectaremos a contenido del Flat CMS.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link to="/" className="rounded border px-3 py-1.5 text-sm hover:bg-slate-50">
          Volver al inicio
        </Link>
        <Link to="/admin" className="rounded border px-3 py-1.5 text-sm hover:bg-slate-50">
          Ir a Admin (después)
        </Link>
      </div>
    </div>
  );
}