
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/MainContent.css";

export default function MainContent() {
  const slides = useMemo(
    () => [
      {
        title:
          "CONVOCATORIA PÚBLICA PARA DEFENSORES PÚBLICOS SEPDEP",
        subtitle: "Para abogados registrados en R.P.A. -  Descarga los formularios y requisitos",
        image:
          "https://sepdep.gob.bo/wp-content/uploads/2025/07/517033863_1095264146037564_8496179364288916488_n.jpg",
      },
      {
        title:
         "COOPERACIÓN INTERINSTITUCIONAL DE RÉGIMEN PENITENCIARIO",
        subtitle: "Juzgados de Ejecución Penal y Régimen Penitenciario",
        image:
          "https://www.defensoria.gob.bo/uploads/images/3ac0f4406a2f5d721aa220a9fd65b89c.jpeg",
      },
      {
        title: "CRONOGRAMA DE LA VACACIÓN JUDICIAL",
        subtitle: "Accede y descarga el documento pdf",
        image:
          "https://pxcdn.reduno.com.bo/reduno/112025/1763126578721.webp?cw=800&ch=450&extw=jpg",
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
                <p className="cardLink__title">Biblioteca Normativa 2026</p>
                <p className="cardLink__subtitle">Descarga las normativas</p>
              </div>
            </div>
          </Link>

          <Link className="cardLink" to="/normas-y-leyes">
            <div className="cardLink__row">
              <div className="cardLink__icon" />
              <div>
                <p className="cardLink__title"> Convocatorias Públicas</p>
                <p className="cardLink__subtitle">Descarga los formularios</p>
              </div>
            </div>
          </Link>

          <div className="videoCard">
  <h3 className="videoCard__title">Tribunal Suprema de Justicia ¿quienes somos?</h3>

  <div className="videoCard__frame">
    <iframe
      src="https://youtu.be/chbyN1Dn7Ls?si=DRz2HT4qIq-k9aSB"
      title="¿Quiénes somos?"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
</div>

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
          <p className="miniCard__desc">Noticias destacadas Jurídicas</p>
        </Link>

        <Link to="/publicaciones" className="miniCard">
          <p className="miniCard__title">Avisos y Comunicados</p>
          <p className="miniCard__desc">Para la comunidad Judicial</p>
        </Link>

      </section>
    </>
  );
}