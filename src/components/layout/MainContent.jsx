
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function ArrowButton({ children, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70"
    >
      {children}
    </button>
  );
}

export default function MainContent() {
  const slides = useMemo(
    () => [
      {
        title:
          "SALA PLENA DEL TSJ INSTRUYE CELERIDAD EN LOS PROCESOS CON VÍCTIMAS...",
        subtitle:
          "Mujeres, niños, niñas, adolescentes o adultos mayores",
        // Si luego quieres imagen real, ponla en /public y usa: "/banner1.jpg"
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=60",
      },
      {
        title: "CONVOCATORIAS ABIERTAS - GESTIÓN 2026",
        subtitle: "Descarga los formularios y requisitos",
        image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=60",
      },
      {
        title: "NORMAS Y LEYES ACTUALIZADAS",
        subtitle: "Accede a PDFs oficiales y resoluciones",
        image:
          "https://images.unsplash.com/photo-1528747045269-390fe33c19a3?auto=format&fit=crop&w=1600&q=60",
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const current = slides[idx];

  const prev = () => setIdx((v) => (v - 1 + slides.length) % slides.length);
  const next = () => setIdx((v) => (v + 1) % slides.length);

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Carrusel */}
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden rounded-lg border bg-slate-100">
          <div
            className="h-[220px] sm:h-[320px] md:h-[380px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          {/* overlay texto */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4">
            <h2 className="text-white font-extrabold text-base sm:text-lg md:text-xl">
              {current.title}
            </h2>
            <p className="mt-1 text-white/90 text-sm">{current.subtitle}</p>
          </div>

          {/* flechas */}
          <div className="absolute inset-y-0 left-2 flex items-center">
            <ArrowButton onClick={prev} label="Anterior">
              ‹
            </ArrowButton>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center">
            <ArrowButton onClick={next} label="Siguiente">
              ›
            </ArrowButton>
          </div>

          {/* dots */}
          <div className="absolute left-0 right-0 bottom-2 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={[
                  "h-2.5 w-2.5 rounded-full border border-white/70",
                  i === idx ? "bg-white" : "bg-white/30",
                ].join(" ")}
                onClick={() => setIdx(i)}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Panel lateral */}
      <aside className="flex flex-col gap-3">
        <CardLink
          title="Seguimiento de Causas"
          subtitle="Consulta el estado de tu proceso"
          to="/publicaciones"
        />
        <CardLink
          title="Génesis - Buscador"
          subtitle="Encuentra documentos y normativa"
          to="/normas-y-leyes"
        />
        <div className="rounded-lg border bg-white p-3">
          <p className="text-sm font-semibold">¿Quieres denunciar actos de corrupción?</p>
          <p className="mt-1 text-sm">
            Haz tu denuncia. También puedes descargar formularios.
          </p>

          <div className="mt-3 flex flex-col gap-2">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-md bg-amber-400 px-3 py-2 text-sm font-bold hover:bg-amber-300"
            >
              HAZ TU DENUNCIA
            </Link>

            <a
              href="#"
              className="text-xs text-slate-600 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              (Luego conectamos a PDF/Word desde Flat CMS)
            </a>
          </div>
        </div>
      </aside>

      {/* Secciones extra (debajo) */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <MiniSection title="Noticias" desc="Últimos comunicados y avisos" to="/publicaciones" />
        <MiniSection title="Convocatorias" desc="Descarga DOCX/PDF de convocatorias" to="/publicaciones" />
        <MiniSection title="Leyes PDF" desc="Repositorio de normativa descargable" to="/normas-y-leyes" />
      </div>
    </section>
  );
}

function CardLink({ title, subtitle, to }) {
  return (
    <Link
      to={to}
      className="rounded-lg border bg-white p-3 hover:bg-slate-50 transition"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded bg-slate-200 shrink-0" />
        <div className="min-w-0">
          <p className="font-bold">{title}</p>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

function MiniSection({ title, desc, to }) {
  return (
    <Link to={to} className="rounded-lg border bg-white p-4 hover:bg-slate-50">
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </Link>
  );
}