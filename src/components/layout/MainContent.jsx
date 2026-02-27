
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/MainContent.css";

export default function MainContent() {
  const slides = useMemo(
    () => [
      {
        title:
          "SALA PLENA DEL TSJ INSTRUYE CELERIDAD EN LOS PROCESOS CON VÍCTIMAS...",
        subtitle: "Mujeres, niños, niñas, adolescentes o adultos mayores",
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
    <>
      <section className="mainGrid">
        <div className="carousel">
          <div
            className="carousel__img"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          <div className="carousel__overlay">
            <h2 className="carousel__title">{current.title}</h2>
            <p className="carousel__subtitle">{current.subtitle}</p>
          </div>

          <button className="carousel__arrow carousel__arrow--left" onClick={prev}>
            ‹
          </button>
          <button className="carousel__arrow carousel__arrow--right" onClick={next}>
            ›
          </button>

          <div className="carousel__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`carousel__dot ${i === idx ? "carousel__dot--active" : ""}`}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        </div>

        <aside className="side">
          <Link className="cardLink" to="/publicaciones">
            <div className="cardLink__row">
              <div className="cardLink__icon" />
              <div>
                <p className="cardLink__title">Seguimiento de Causas</p>
                <p className="cardLink__subtitle">Consulta el estado de tu proceso</p>
              </div>
            </div>
          </Link>

          <Link className="cardLink" to="/normas-y-leyes">
            <div className="cardLink__row">
              <div className="cardLink__icon" />
              <div>
                <p className="cardLink__title">Génesis - Buscador</p>
                <p className="cardLink__subtitle">Encuentra documentos y normativa</p>
              </div>
            </div>
          </Link>

          <div className="denuncia">
            <p style={{ margin: 0, fontWeight: 800 }}>
              ¿Quieres denunciar actos de corrupción?
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#555" }}>
              Haz tu denuncia. También puedes descargar formularios.
            </p>

            <div style={{ marginTop: 10 }}>
              <button className="denuncia__btn">HAZ TU DENUNCIA</button>
              <p style={{ margin: "6px 0 0", fontSize: 12, color: "#666" }}>
                800-10-11-91 Línea gratuita
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="miniGrid">
        <Link to="/publicaciones" className="miniCard">
          <p className="miniCard__title">Noticias</p>
          <p className="miniCard__desc">Últimos comunicados y avisos</p>
        </Link>

        <Link to="/publicaciones" className="miniCard">
          <p className="miniCard__title">Convocatorias</p>
          <p className="miniCard__desc">Descarga DOCX/PDF de convocatorias</p>
        </Link>

        <Link to="/normas-y-leyes" className="miniCard">
          <p className="miniCard__title">Leyes PDF</p>
          <p className="miniCard__desc">Repositorio de normativa descargable</p>
        </Link>
      </section>
    </>
  );
}