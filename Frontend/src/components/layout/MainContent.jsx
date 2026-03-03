
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/MainContent.css";

export default function MainContent() {
  // Cargar contenido dinámico desde public/content.json
  const [home, setHome] = useState(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    fetch("/content.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setHome(data?.home ?? null);
        setIdx(0);
      })
      .catch((e) => console.error("Error cargando content.json:", e));
  }, []);

  
  if (!home) return null;

  // Datos desde JSON
  const slides = home.carousel ?? [];
  const sideCards = home.sideCards ?? [];
  const video = home.video ?? null;
  const miniCards = home.miniCards ?? [];
  const interestLinks = home.interestLinks ?? null;

  
  const current = slides.length > 0 ? slides[idx] : null;

  const prev = () => {
    if (!slides.length) return;
    setIdx((v) => (v - 1 + slides.length) % slides.length);
  };

  const next = () => {
    if (!slides.length) return;
    setIdx((v) => (v + 1) % slides.length);
  };

  return (
    <>
      <section className="mainGrid">
      
        <div className="carousel">
          {current ? (
            <>
              <div
                className="carousel__img"
                style={{ backgroundImage: `url(${current.image})` }}
              />
              <div className="carousel__overlay">
                <h2 className="carousel__title">{current.title}</h2>
                <p className="carousel__subtitle">{current.subtitle}</p>
              </div>

              <button
                className="carousel__arrow carousel__arrow--left"
                onClick={prev}
                type="button"
              >
                ‹
              </button>
              <button
                className="carousel__arrow carousel__arrow--right"
                onClick={next}
                type="button"
              >
                ›
              </button>

              <div className="carousel__dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel__dot ${
                      i === idx ? "carousel__dot--active" : ""
                    }`}
                    onClick={() => setIdx(i)}
                    type="button"
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="carousel__overlay">
              <p className="carousel__subtitle">
                No hay slides configurados en content.json (home.carousel).
              </p>
            </div>
          )}
        </div>

        
        <aside className="side">
          
          {sideCards.map((card, i) => (
            <Link key={i} className="cardLink" to={card.to}>
              <div className="cardLink__row">
                
                <div
                  className="cardLink__icon"
                  style={{
                    backgroundImage: card.icon ? `url(${card.icon})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <div>
                  <p className="cardLink__title">{card.title}</p>
                  <p className="cardLink__subtitle">{card.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}

         
          {video?.embedUrl ? (
            <div className="videoCard">
              <h3 className="videoCard__title">{video.title}</h3>

              <div className="videoCard__frame">
                <video controls style={{ width: "100%", height: "100%" }}>
                  <source src={video.embedUrl} type="video/mp4" />
                  Tu navegador no soporta reproducción de video.
                </video>
              </div>
            </div>
          ) : null}

          
          <div className="denuncia">
            <p style={{ margin: 0, fontWeight: 800 }}>
              ¿Quieres denunciar actos de corrupción?
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#555" }}>
              Haz tu denuncia. También puedes descargar formularios.
            </p>

            <div style={{ marginTop: 10 }}>
              <button className="denuncia__btn" type="button">
                HAZ TU DENUNCIA
              </button>
              <p style={{ margin: "6px 0 0", fontSize: 12, color: "#666" }}>
                800-10-11-91 Línea gratuita
              </p>
            </div>
          </div>
        </aside>
      </section>

      
      <section className="miniGrid">
        {miniCards.map((c, i) => (
          <Link key={i} to={c.to} className="miniCard">
            <p className="miniCard__title">{c.title}</p>
            <p className="miniCard__desc">{c.desc}</p>
          </Link>
        ))}
      </section>

      
{interestLinks ? (
  <section className="linksInterest">
    <h2 className="linksInterest__title">{interestLinks.title}</h2>

    <div className="linksInterest__grid">
      {(interestLinks.items ?? []).map((it, i) => (
        <a
          key={i}
          className="linksInterest__item"
          href={it.url}
          target="_blank"
          rel="noreferrer"
          title={it.name}
        >
          <img src={it.logo} alt={it.name} />
          <span>{it.name}</span>
        </a>
      ))}
    </div>
  </section>
) : null}

    </>
  );
}