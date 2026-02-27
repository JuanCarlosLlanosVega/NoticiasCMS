import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../styles/components/Header.css";

export default function Header() {
  const [openTopMenu, setOpenTopMenu] = useState(false);
  const panelRef = useRef(null);

  const closeMenu = () => setOpenTopMenu(false);
  const toggleMenu = () => setOpenTopMenu((v) => !v);

  // Cerrar al hacer click fuera del panel + ESC
  useEffect(() => {
    if (!openTopMenu) return;

    const onMouseDown = (e) => {
      if (!panelRef.current) return;
      const clickedInsidePanel = panelRef.current.contains(e.target);
      if (!clickedInsidePanel) closeMenu();
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openTopMenu]);

  // (Opcional) bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (!openTopMenu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openTopMenu]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">LOGO</div>

          <div className="header__titleWrap">
            <h1 className="header__title">PORTAL JURÍDICO COCHABAMBA</h1>
            <div className="header__line" />
          </div>

          {/* Desktop: links + botón menú */}
          <div className="header__topLinks">
            <Link to="/quienes-somos">Quienes somos</Link>
            <Link to="/contactanos">Contáctanos</Link>

            <button
              type="button"
              className="header__btn"
              onClick={toggleMenu}
              aria-expanded={openTopMenu}
              aria-controls="header-drawer"
            >
              Menú
            </button>
          </div>

          {/* Mobile: solo botón */}
          <button
            type="button"
            className="header__btn header__mobileBtn"
            onClick={toggleMenu}
            aria-expanded={openTopMenu}
            aria-controls="header-drawer"
          >
            Menú
          </button>
        </div>
      </div>

      {/* Overlay + Drawer (sirve en desktop y mobile) */}
      {openTopMenu && (
        <div className="header__overlay" aria-hidden={!openTopMenu}>
          <aside
            id="header-drawer"
            ref={panelRef}
            className="header__drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="header__drawerHeader">
              <span className="header__drawerTitle">Navegación</span>
              <button
                type="button"
                className="header__drawerClose"
                onClick={closeMenu}
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>

            <nav className="header__drawerLinks">
              <Link to="/quienes-somos" onClick={closeMenu}>
                Quienes somos
              </Link>
              <Link to="/contactanos" onClick={closeMenu}>
                Contáctanos
              </Link>
              <Link to="/admin" className="header__admin" onClick={closeMenu}>
                Ingresar como Administrador
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}