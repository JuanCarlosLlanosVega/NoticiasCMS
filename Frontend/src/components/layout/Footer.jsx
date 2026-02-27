import "../../styles/components/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footerX">
      <div className="container">
        <div className="footerX__grid">

          {/* Columna 2: Buscador + redes */}
          <div className="footerX__col">
            <h4 className="footerX__subtitle">Buscar en el sitio</h4>

            <form
              className="footerX__search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="footerX__input"
                type="search"
                placeholder="Buscar en este sitio..."
                aria-label="Buscar en este sitio"
              />
              <button className="footerX__btn" type="submit">
                Buscar
              </button>
            </form>

            <div className="footerX__social">
              <a className="footerX__socialBtn" href="#" aria-label="Facebook">
                f
              </a>
              <a className="footerX__socialBtn" href="#" aria-label="Instagram">
                ⌁
              </a>
              <a className="footerX__socialBtn" href="#" aria-label="TikTok">
                ♪
              </a>
              <a className="footerX__socialBtn" href="#" aria-label="X">
                X
              </a>
              <a className="footerX__socialBtn" href="#" aria-label="YouTube">
                ▶
              </a>
            </div>

            <p className="footerX__hint">
              *Luego conectamos el buscador a tu CMS.
            </p>
          </div>

          {/* Columna 3: Links */}
          <div className="footerX__col">
            <h4 className="footerX__subtitle">Enlaces</h4>

            <nav className="footerX__links">
              <a href="/servicios-judiciales">Servicios Judiciales</a>
              <a href="/jurisprudencia">Jurisprudencia</a>
              <a href="/gestora-de-procesos">Gestora de Procesos</a>
              <a href="/transparencia">Transparencia</a>
              <a href="/observatorio">Observatorio</a>
              <a href="/defensorias">Defensorial Judicial y Fiscal</a>
              <a href="/prensa">Prensa</a>
            </nav>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="footerX__bottom">
        <div className="container footerX__bottomRow">
          <span>© {year} Portal Jurídico Cochabamba. JUAN CARLOS LLANOS VEGA.</span>
          <span> Generación de Software</span>
        </div>
      </div>
    </footer>
  );
}